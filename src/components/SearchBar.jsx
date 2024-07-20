// import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
// import {Configure, Hits, InstantSearch, SearchBox} from "react-instantsearch";
// import {Hit} from "@/components/Hit.jsx";
import algoliasearch from "algoliasearch";

const searchClient = algoliasearch("CP7DP8RN52", "5f867486941253db889ddcd357b02203");


function SearchBar() {
    console.log(searchClient);
    return (
        <div className="md:hidden relative m-1 mt-20 sm:pr-3 sm:pl-3">
            {/*<InstantSearch searchClient={searchClient} indexName="bjg-products">*/}
            {/*    <Configure hitsPerPage={5} />*/}
            {/*    <Search className="absolute left-2.5 top-2.5 h-6 w-5 text-muted-foreground"/>*/}
            <Input
                type="search for anything..."
                placeholder="Search..."
                className="rounded-lg bg-background pl-8 pr-8 min-h-12"
            />

            {/*    <Hits hitComponent={Hit} />*/}
            {/*</InstantSearch>*/}

        </div>
    );
}

export default SearchBar;