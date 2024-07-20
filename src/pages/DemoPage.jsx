import {useEffect, useMemo, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import categories from "@/db/categories.json";

import ImageUpload from "@/components/image-upload";

function Upload() {
    return (<main className="flex justify-center items-center min-h-screen">
        <Card className="w-[425px]">
            <CardHeader>
                <CardTitle className="text-center">Upload your files</CardTitle>
                <CardDescription className="text-center">
                    The only file upload you will ever need
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 py-4">
                    <ImageUpload/>
                </div>
            </CardContent>
        </Card>
    </main>);
}


const ProductCategory = ({title, imageSrc, altText}) => (<Card className="min-w-[135px] max-w-[135px] md:min-w-[320px]">
        <CardContent className="p-2">
            <h3 className="font-bold text-xs mb-1">{title}</h3>
            <AspectRatio ratio={4 / 3}>
                <img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded"/>
            </AspectRatio>
        </CardContent>
</Card>);

const CategoryHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const backgroundImages = useMemo(() => ["https://via.placeholder.com/800x400", "https://via.placeholder.com/800x400", "https://via.placeholder.com/800x400",], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    return (<div className="relative overflow-hidden m-2 sm:m-1 max-h-[600px]">
            {/* Background carousel */}
            <Carousel className="w-full">
                <CarouselContent>
                    {backgroundImages.map((src, index) => (
                        <CarouselItem key={index} className={index === currentSlide ? 'block' : 'hidden'}>
                            <AspectRatio ratio={1}>
                                <img src={src} alt={`Beauty products background ${index + 1}`}
                                     className="w-full h-full object-cover"/>
                            </AspectRatio>
                        </CarouselItem>))}
                </CarouselContent>
            </Carousel>

            {/* Overlay content */}
            <div className="absolute inset-0 bg-opacity-70 flex flex-col justify-between p-4">
                {/* Centered header */}
                <div className="flex flex-grow items-center justify-center">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Something to do</h2>
                </div>

                {/* Product categories at the bottom */}
                <div className="w-full overflow-x-auto no-scrollbar mt-auto">
                    <div className="flex space-x-2">
                        {categories[0].sub.map((category, index) => (<ProductCategory
                                key={index}
                                title={category.name}
                                imageSrc="https://via.placeholder.com/200x150"
                                altText={`Category ${category.name}`}
                        />))}
                    </div>
                </div>
            </div>
    </div>);
};

export default function DemoPage() {
    return (<>
            <CategoryHero/>
        <Upload/>
    </>);
}
