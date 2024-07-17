import {Skeleton} from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]"/>
                <Skeleton className="h-4 w-[200px]"/>
            </div>
        </div>
    )
}

export function SkeletonCatNav() {
    return (
        <nav className="mt-2 lg:mt-20 bg-gray-50 p-2 pt-0 navbarSecond">
            <div className="w-full h-42 overflow-y-scroll no-scrollbar py-4 px-2 -mx-2 whitespace-nowrap">
                <Skeleton className={"h-42 w-full"}/>
            </div>
        </nav>
    )
}