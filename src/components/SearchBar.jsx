import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

function SearchBar() {
    return (
        <div className="md:hidden relative m-1 mt-20 sm:pr-3 sm:pl-3">
            <Search className="absolute left-2.5 top-2.5 h-6 w-5 text-muted-foreground"/>
            <Input
                type="search for anything..."
                placeholder="Search..."
                className="rounded-lg bg-background pl-8 pr-8 min-h-12"
            />
        </div>
    );
}

export default SearchBar;