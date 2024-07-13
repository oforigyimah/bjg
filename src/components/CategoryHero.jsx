import {useEffect, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchSubCatImages, getImageUrl} from "@/lib/utils";
import {useCategory} from "@/context/CategoryContext"

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
    const [backgroundImagesUrls, setBackgroundImagesUrls] = useState([]);
    const navigate = useNavigate();

    const {
        selectedCategory,
        setSelectedCategory,
        subcategories,
        setSubcategories,
        categories,
        isLoading,
        error,
        setSelectedSubCat
    } = useCategory();

    useEffect(() => {
        if (categories && selectedCategory) {
            const categoryObj = categories.find(cat => cat?.id === selectedCategory?.id);
            if (categoryObj && categoryObj.images) {
                const fetchUrls = async () => {
                    const urls = await Promise.all(categoryObj.images.map(imagePath => getImageUrl(imagePath)));
                    setBackgroundImagesUrls(urls);
                };
                fetchUrls().catch(console.error);
            }
        }

    }, [categories, selectedCategory]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % backgroundImagesUrls.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [backgroundImagesUrls.length]);

    const {
        data: subCatImages,
        error: subCatImagesError,
        isLoading: subCatImagesLoading
    } = useQuery(['subCatImages', subcategories], () => fetchSubCatImages(subcategories), {
        enabled: subcategories.length > 0, staleTime: Infinity,
    });

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + backgroundImagesUrls.length) % backgroundImagesUrls.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % backgroundImagesUrls.length);
    };

    const updateURL = (newSubCat) => {
        const searchParams = new URLSearchParams();
        if (selectedCategory?.id) searchParams.set('category', selectedCategory.id);
        if (newSubCat?.id) searchParams.set('sub', newSubCat.id);
        navigate(`?${searchParams.toString()}`);
    };

    const handleSubCatClick = (subCat) => {
        setSelectedSubCat(subCat);
        updateURL(subCat);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (<div className="relative overflow-hidden m-2 sm:m-1 max-h-[600px]">
            {/* Background carousel */}
            <Carousel className="w-full">
                <CarouselContent>
                    {backgroundImagesUrls.map((src, index) => (
                        <CarouselItem key={index} className={index === currentSlide ? 'block' : 'hidden'}>
                            <AspectRatio ratio={1}>
                                <img src={src} alt={`Category background ${index + 1}`}
                                     className="w-full h-full object-cover"/>
                            </AspectRatio>
                        </CarouselItem>))}
                </CarouselContent>
            </Carousel>

            {/* Navigation arrows */}
            <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10 cursor-pointer"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800"/>
            </button>
            <button
                onClick={handleNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10 cursor-pointer"
            >
                <ChevronRight className="w-6 h-6 text-gray-800"/>
            </button>

            {/* Overlay content */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-4">
                {/* Centered header */}
                <div className="flex flex-grow items-center justify-center">
                    <h2 className="text-3xl font-bold text-center text-white">{selectedCategory?.name || ""}</h2>
                </div>

                {/* Subcategories at the bottom */}
                <div className="w-full overflow-x-auto no-scrollbar mt-auto">
                    <div className="flex space-x-2">
                        {subcategories.map((subcat, index) => {
                            if (!subCatImages || !subCatImages[subcat.id] || subCatImages[subcat.id].length === 0) {
                                console.log("Skipping subcategory", subcat.id, "as images are not yet fetched");
                                return null; // Skip rendering if images are not yet fetched
                            }

                            let title = subcat?.name;
                            let imageSrc = subCatImages[subcat.id][Math.floor(Math.random() * subCatImages[subcat.id].length)];
                            let altText = `Subcategory ${subcat?.name}`;
                            return (<button key={index}
                                            className="focus:outline-none"
                                            onClick={() => handleSubCatClick(subcat)}
                                >
                                    <ProductCategory
                                        title={title}
                                        imageSrc={imageSrc}
                                        altText={altText}
                                    />
                            </button>)
                        })}
                    </div>
                </div>
            </div>
    </div>);
};

export default CategoryHero;

