import {Card} from "@/components/ui/card";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {BookmarkIcon} from "lucide-react";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";

export default function ProductCard(props) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    }
    const onBookmarkClick = (event) => {
        // TODO: inplement Bookmark
        event.stopPropagation();
        if (isBookmarked) {
            console.log("Bookmark removed");
            toggleBookmark();
        } else {
            toggleBookmark();
            console.log("Bookmark clicked");
        }
    }
    return (
        <Card className="w-full max-w-sm rounded-xl relative">
            <div className="grid gap-4 p-4 sm:p-2">
                <div className="relative w-full overflow-hidden rounded-xl">
                    <Link to={`/product/${props.product.id}`}>
                        <AspectRatio ratio={1}>
                            <img
                                src={props.product.thumbnail}
                                alt={props.product.title}
                                className="object-cover w-full"
                            />
                        </AspectRatio>
                    </Link>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full absolute bottom-2 right-2 w-8 h-8 cursor-pointer"
                    >
                        <BookmarkIcon
                            className={cn("", isBookmarked ? 'fill-current text-blue-800' : 'text-muted-foreground')}
                            onClick={onBookmarkClick}
                        />
                    </Button>
                </div>
                <Link to={`/product/${props.product.id}`}>
                    <div className="grid gap-0.5">
                        <h3 className="font-semibold text-sm md:text-base">{props.product.title}</h3>
                        <p className="font-semibold text-sm md:text-base">GHS {props.product.price}</p>
                    </div>
                </Link>
            </div>
        </Card>
    );
}
