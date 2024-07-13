import {Outlet} from "react-router-dom";
import NavbarV0 from "@/components/NavbarV0";
import SearchBar from "@/components/SearchBar";
import CategoryNavbar from "@/components/categoryNavbar";
import CategoryHero from "@/components/CategoryHero";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {CategoryProvider} from "@/context/CategoryContext"


const queryClient = new QueryClient();

const LandingPage = () => {
    return (<div className="h-full">
            <NavbarV0/>
            <SearchBar/>
            <QueryClientProvider client={queryClient}>
                <CategoryProvider>
                    <CategoryNavbar/>
                    <CategoryHero/>
                    <Outlet/>
                </CategoryProvider>
            </QueryClientProvider>

    </div>)
}

export default LandingPage;