import React, {useState} from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.jsx";
import {cn} from "@/lib/utils.js";
import {Check, ChevronRight, ChevronsUpDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";

const ComboboxLoc = ({className, field, locations}) => {
    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSelect = (item, isDistrict) => {
        field.onChange(item.code);
        setOpen(false);
        setSelectedLocation(null);
    };

    const renderItems = (items, isDistrict = false) =>
        items.map((item) => (
            <React.Fragment key={item.code}>
                <CommandItem
                    onSelect={() => {
                        if (!isDistrict && item.districts) {
                            setSelectedLocation(item);
                        } else {
                            handleSelect(item, isDistrict);
                        }
                    }}
                    className={cn(isDistrict && "pl-6")}
                >
                    {!isDistrict && item.districts && <ChevronRight className="mr-2 h-4 w-4"/>}
                    <Check className={cn("mr-2 h-4 w-4", item.code === field.value ? "opacity-100" : "opacity-0")}/>
                    {item.label}
                </CommandItem>
                {!isDistrict && item.districts && selectedLocation?.code === item.code && renderItems(item.districts, true)}
            </React.Fragment>
        ));

    const findItem = (items, code, isDistrict = false) => {
        for (const item of items) {
            if (item.code === code) return item;
            if (!isDistrict && item.districts) {
                const found = findItem(item.districts, code, true);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedItem = field.value ? findItem(locations, field.value) : null;

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open}
                            className="w-[200px] justify-between">
                        {selectedItem ? selectedItem.label : "Select location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search location..."/>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>{renderItems(locations)}</CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ComboboxLoc;