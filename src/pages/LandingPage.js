import {Outlet} from "react-router-dom";
import NavbarV0 from "@/components/NavbarV0";
import SearchBar from "@/components/SearchBar";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import CategoryHero from "@/components/CategoryHero";

const LandingPage = () => {
    return (
        <div className="h-full">
            <NavbarV0/>
            <SearchBar/>
            <SecondaryNavbar/>
            <CategoryHero/>
            <Outlet/>
        </div>
    )
}

export default LandingPage;