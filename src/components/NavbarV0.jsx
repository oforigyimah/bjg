import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {NavLink} from 'react-router-dom';
import {BookmarkCheck, Menu, Search} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Img as Image} from 'react-image';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {auth} from "@/firebaseConfig";
import {onAuthStateChanged, signOut} from 'firebase/auth'
// import {Configure, Hits, InstantSearch} from "react-instantsearch";
// import {Hit} from "@/components/Hit.jsx";
// import algoliasearch from "algoliasearch/lite.js";

// const searchClient = algoliasearch("CP7DP8RN52", "5f867486941253db889ddcd357b02203");

function SearchBar() {
    // console.log(searchClient);
    return (
        <div className="relative ml-10 mr-5 flex-1 w-full hidden md:flex md:grow-0">
            {/*<InstantSearch searchClient={searchClient} indexName="bjg-products">*/}
            {/*    <Configure hitsPerPage={5} />*/}
            <Search className="absolute left-2.5 top-2.5 h-5 w-4 text-muted-foreground"/>
            <Input
                type="search for anything..."
                placeholder="Search..."
                className="w-1/2 rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
            {/*<Hits hitComponent={Hit} />*/}
            {/*</InstantSearch>*/}

        </div>
    );
}

function Profile({isLoggedIn, setIsLoggedIn}) {

    // TODO: implement routes foe setting Setting and Logout;

    const handleLogout = () => {
        if (isLoggedIn)
            signOut(auth).then(() => {
                console.log("User has been logged out");
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleSettings = () => {
        // Navigate("/settings");
        console.log("Settings has been clicked");
    };

    const handleSupport = () => {
        // Navigate("/support");
        console.log("Support has been clicked");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <Image
                        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <NavLink to={"my-account"}>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                </NavLink>
                <DropdownMenuSeparator/>
                <NavLink to={"settings"}>
                    <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
                </NavLink>
                <NavLink to={"support"}>
                    <DropdownMenuItem onClick={handleSupport}>Support</DropdownMenuItem>
                </NavLink>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function NavbarV0() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });

    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <NavLink
                                        to={"/"}
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <Image src={"assets/logo_10.jpg"} className={"h-12 w-12"}/>
                                    </NavLink>
                                    <NavLink
                                        to={"/farmers"}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Farmers
                                    </NavLink>
                                    <NavLink
                                        to={"/traders"}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Traders
                                    </NavLink>
                                    <NavLink
                                        to={"/investors"}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Investors
                                    </NavLink>
                                    <NavLink to={"/fqa"} className="hover:text-foreground">
                                        FQA
                                    </NavLink>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <NavLink to={"/"} className="flex items-center ml-4">
                            {/*<Image src={"assets/logo_10.jpg"} className={"h-8 w-8"}/>*/}
                            <span className="ml-2 font-bold text-xl text-blue-800">AGRAPRO</span>
                        </NavLink>
                    </div>
                    <nav className="hidden md:flex gap-4">
                        <NavLink
                            to={"/farmers"}
                            className="font-bold flex items-center text-sm transition-colors hover:underline"
                        >
                            Farmers
                        </NavLink>
                        <NavLink
                            to={"/traders"}
                            className="font-bold flex items-center text-sm transition-colors hover:underline"

                        >
                            Traders
                        </NavLink>
                        <NavLink
                            to={"/investors"}
                            className="font-bold flex items-center text-sm transition-colors hover:underline"
                        >
                            Investors
                        </NavLink>
                        <NavLink
                            to={"/statistics"}
                            className="font-bold flex items-center text-sm transition-colors hover:underline"
                        >
                            Statistics
                        </NavLink>
                        <NavLink
                            to={"/fqa"}
                            className="font-bold flex items-center text-sm transition-colors hover:underline"
                        >
                            FQA
                        </NavLink>
                    </nav>
                    <SearchBar/>
                    {isLoggedIn ? (
                        <div className={"flex flex-row"}>
                            <NavLink to={"sell"} className={"mr-3 w-20"}>
                                <Button className={"min-w-full"}>
                                    <span className={"text-l font-bold "}>Sell</span>
                                </Button>
                            </NavLink>
                            <NavLink to={"bookmarks"}>
                                <BookmarkCheck className={"mt-1.5 mr-4"}></BookmarkCheck>
                            </NavLink>

                            <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <NavLink to={"sign-in"}>
                                <Button variant="outline" size="sm">
                                    Sign in
                                </Button>
                            </NavLink>
                            <NavLink to={"sign-up"}>
                                <Button size="sm">Sign up</Button>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

