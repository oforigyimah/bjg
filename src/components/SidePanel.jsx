import React, {useState} from 'react';
import {ScrollArea} from "@/components/ui/scroll-area"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Checkbox} from "@/components/ui/checkbox"
import categories from "@/db/categories.json"


const filters = [{id: "inStock", label: "In Stock"}, {id: "onSale", label: "On Sale"}, {
    id: "freeShipping",
    label: "Free Shipping"
},];

const SidePanel = () => {
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterChange = (filterId) => {
        setSelectedFilters((prev) => ({
            ...prev, [filterId]: !prev[filterId],
        }));
    };

    const renderSubcategories = (subcategories) => {
        return subcategories.map((subcategory, index) => (<li key={index} className="mb-2">
            <Checkbox id={subcategory.name}/>
            <label htmlFor={subcategory.name} className="ml-2 text-sm">
                {subcategory.name}
            </label>
        </li>));
    };

    const renderCategories = (categories) => {
        return categories.map((category, index) => (
            <AccordionItem value={category.name} key={index}>
                <AccordionTrigger>{category.name}</AccordionTrigger>`
                <AccordionContent>
                    <ul className="ml-4">
                        {Array.isArray(category.sub) ? renderSubcategories(category.sub) : "renderCategories(category.sub)"}
                    </ul>
                </AccordionContent>
            </AccordionItem>));
    };


    return (
        <div className={"hidden lg:block"}>
            <aside className={`w-84 bg-background border-r h-screen fixed top-15 left-0 overflow-hidden flex flex-col`}>
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <ScrollArea className="flex-grow">
                    <div className="p-4">
                        <Accordion type="multiple" collapsible className="w-full">
                            {renderCategories(categories)}
                        </Accordion>

                        <div className="mt-6">
                            <h3 className="text-sm font-semibold mb-2">Additional Filters</h3>
                            {filters.map((filter) => (<div key={filter.id} className="flex items-center mb-2">
                                <Checkbox
                                    id={filter.id}
                                    checked={selectedFilters[filter.id] || false}
                                    onCheckedChange={() => handleFilterChange(filter.id)}
                                />
                                <label htmlFor={filter.id} className="ml-2 text-sm">
                                    {filter.label}
                                </label>
                            </div>))}
                        </div>
                    </div>
                </ScrollArea>
            </aside>
        </div>);
};

export default SidePanel;