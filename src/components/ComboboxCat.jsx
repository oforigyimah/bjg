import React, {useState} from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.jsx";
import {cn} from "@/lib/utils.js";
import {Check, ChevronRight, ChevronsUpDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";

const ComboboxCat = ({className, field, categories}) => {
    const [open, setOpen] = useState(false);
    const [selectedPath, setSelectedPath] = useState([]);

    const handleSelect = (category) => {
        field.onChange(category.id);
        setOpen(false);
        setSelectedPath([]);
    };

    const renderCategories = (cats, depth = 0) =>
        cats.map((category) => (
            <React.Fragment key={category.id}>
                <CommandItem
                    onSelect={() => {
                        if (category.sub) {
                            setSelectedPath([...selectedPath.slice(0, depth), category]);
                        } else {
                            handleSelect(category);
                        }
                    }}
                    className={cn("pl-" + (depth * 4 + 2))}
                >
                    {category.sub && <ChevronRight className="mr-2 h-4 w-4"/>}
                    <Check className={cn("mr-2 h-4 w-4", category.id === field.value ? "opacity-100" : "opacity-0")}/>
                    {category.name}
                </CommandItem>
                {category.sub && selectedPath[depth]?.id === category.id && renderCategories(category.sub, depth + 1)}
            </React.Fragment>
        ));

    const findCategoryPath = (cats, targetId, path = []) => {
        for (const cat of cats) {
            if (cat.id === targetId) {
                return [...path, cat];
            }
            if (cat.sub) {
                const subPath = findCategoryPath(cat.sub, targetId, [...path, cat]);
                if (subPath) return subPath;
            }
        }
        return null;
    };

    const selectedCategory = field.value ? findCategoryPath(categories, field.value) : null;

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open}
                            className="w-[200px] justify-between">
                        {selectedCategory ? selectedCategory.map((cat) => cat.name).join(" > ") : "Select category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search category..."/>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>{renderCategories(categories)}</CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ComboboxCat;