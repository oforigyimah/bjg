import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchSubCatImages, getImageUrl} from "@/lib/utils";
import {useCategory} from "@/context/CategoryContext";

const ProductCategory = ({title, imageSrc, altText}) => (<Card className="min-w-[135px] max-w-[135px] md:min-w-[320px]">
    <CardContent className="p-2">
        <h3 className="font-bold text-xs mb-1">{title}</h3>
        <AspectRatio ratio={4 / 3}>
            <img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded"/>
        </AspectRatio>
    </CardContent>
</Card>);

const BackgroundCarousel = memo(({backgroundImagesUrls, currentSlide}) => (<Carousel className="w-full">
    <CarouselContent>
        {backgroundImagesUrls.map((src, index) => (
            <CarouselItem key={index} className={index === currentSlide ? 'block' : 'hidden'}>
                <AspectRatio ratio={1}>
                    <img src={src} alt={`Category background ${index + 1}`} className="w-full h-full object-cover"/>
                </AspectRatio>
            </CarouselItem>))}
    </CarouselContent>
</Carousel>));

const CategoryHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [backgroundImagesUrls, setBackgroundImagesUrls] = useState([]);
    const navigate = useNavigate();

    const {
        selectedCategory, subcategories, isLoading, error, setSelectedSubCat
    } = useCategory();

    useEffect(() => {
        if (Array.isArray(selectedCategory?.images)) {
            const fetchUrls = async () => {
                const urls = await Promise.all(selectedCategory.images.map(imagePath => getImageUrl(imagePath)));
                setBackgroundImagesUrls(urls);
            };
            fetchUrls().catch(console.error);

        }
    }, [selectedCategory]);


    const {
        data: subCatImages, error: subCatImagesError, isLoading: subCatImagesLoading
    } = useQuery({
        queryKey: ['subCatImages', subcategories],
        queryFn: () => fetchSubCatImages(subcategories),
        enabled: subcategories.length > 0,
        staleTime: Infinity,
    });

    const handleSlideChange = useCallback((direction) => {
        setCurrentSlide(prevSlide => {
            const newSlide = direction === 'next' ? (prevSlide + 1) % backgroundImagesUrls.length : (prevSlide - 1 + backgroundImagesUrls.length) % backgroundImagesUrls.length;
            return newSlide;
        });
    }, [backgroundImagesUrls.length]);

    const updateURL = useCallback((newSubCat) => {
        const searchParams = new URLSearchParams();
        if (selectedCategory?.id) searchParams.set('cat', selectedCategory.id);
        if (newSubCat?.id) searchParams.set('sub', newSubCat.id);
        navigate(`?${searchParams.toString()}`);
    }, [selectedCategory]);

    const handleSubCatClick = useCallback((subCat) => {
        setSelectedSubCat(subCat);
        updateURL(subCat);
    }, [setSelectedSubCat, updateURL]);

    const memoizedSubcategories = useMemo(() => {
        return subcategories.map((subcat) => {
            if (!subCatImages || !subCatImages[subcat.id] || subCatImages[subcat.id].length === 0) {
                console.log(`Skipping subcategory ${subcat.name} due to missing images`);
                return null;
            }

            const imageSrc = subCatImages[subcat.id][Math.floor(Math.random() * subCatImages[subcat.id].length)];
            console.log(imageSrc);
            return (<ProductCategory
                key={subcat.id}
                title={subcat.name}
                imageSrc={imageSrc}
                altText={`Subcategory ${subcat.name}`}
                onClick={() => handleSubCatClick(subcat)}
            />);
        }).filter(Boolean);
    }, [subcategories, subCatImages, handleSubCatClick]);

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

    return (<div className="relative overflow-hidden m-2 sm:m-1 max-h-[600px]">
        <BackgroundCarousel backgroundImagesUrls={backgroundImagesUrls} currentSlide={currentSlide}/>

        <button
            onClick={() => handleSlideChange('prev')}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10 cursor-pointer"
            aria-label="Previous slide"
        >
            <ChevronLeft className="w-6 h-6 text-gray-800"/>
        </button>
        <button
            onClick={() => handleSlideChange('next')}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10 cursor-pointer"
            aria-label="Next slide"
        >
            <ChevronRight className="w-6 h-6 text-gray-800"/>
        </button>

        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-4">
            <div className="flex flex-grow items-center justify-center">
                <h2 className="text-3xl font-bold text-center text-white">{selectedCategory?.name || ""}</h2>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar mt-auto">
                <div className="flex space-x-2">
                    {memoizedSubcategories}
                </div>
            </div>
        </div>
    </div>);
};

export default memo(CategoryHero);
