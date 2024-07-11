import {Outlet} from "react-router-dom";
import NavbarV0 from "@/components/NavbarV0";
import SearchBar from "@/components/SearchBar";
import CategoryNavbar from "@/components/categoryNavbar";
import CategoryHero from "@/components/CategoryHero";
import {QueryClientProvider, QueryClient} from "react-query";
import React from "react";


const queryClient = new QueryClient();

const LandingPage = () => {
    return (
        <div className="h-full">
            <NavbarV0/>
            <SearchBar/>
            <QueryClientProvider client={queryClient}>
                <CategoryNavbar/>
            <CategoryHero/>
            <Outlet/>
            </QueryClientProvider>

        </div>
    )
}

export default LandingPage;