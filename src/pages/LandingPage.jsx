import {Outlet} from "react-router-dom";
import NavbarV0 from "@/components/NavbarV0";
import SearchBar from "@/components/SearchBar";
import CategoryNavbar from "@/components/categoryNavbar";
import CategoryHero from "@/components/CategoryHero";
import {CategoryProvider} from "@/context/CategoryContext"


const LandingPage = () => {
    return (<div className="h-full">
            <NavbarV0/>
            <SearchBar/>
                <CategoryProvider>
                    <CategoryNavbar/>
                    <CategoryHero/>
                    <Outlet/>
                </CategoryProvider>

    </div>)
}

export default LandingPage;