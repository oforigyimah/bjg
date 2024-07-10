import React, {useEffect, useMemo, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {ChevronLeft, ChevronRight} from 'lucide-react';
import categories from "@/db/categories.json";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "@/firebaseConfig";
import {useLocation, useNavigate} from "react-router-dom";


const farmUrls = [];
const farmRef = ref(storage, 'categoriesImages/farm');
listAll(farmRef).then((res) => {
    res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
            farmUrls.push(url);
        }).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log("File doesn't exist");
                    break;
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;
                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect the server response");
                    break;
                default:
                    console.log("Unknown error occurred, inspect the server response");
                    break;
            }
        });
    });
});


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
    const backgroundImages = useMemo(() => farmUrls, []);

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedSubCat, setSelectedSubCat] = useState(null);
    const [category, setCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');
        setCategory(categoryParam);

        const matchedCategory = categories.find(cat => cat.name.toLowerCase() === categoryParam?.toLowerCase());
        if (matchedCategory) {
            setSubcategories(matchedCategory.sub || []);
        } else {
            setSubcategories([]);
        }
    }, [location]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % backgroundImages.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + backgroundImages.length) % backgroundImages.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % backgroundImages.length);
    };

    const updateURL = () => {
        const searchParams = new URLSearchParams();
        searchParams.set('category', category.name);
        searchParams.set('sub', selectedSubCat.name)
        navigate(`?${searchParams.toString()}`);
    };

    const handleSubCatClick = (subCat) => {
        setSelectedSubCat(subCat);
        updateURL();
    };

    return (<div className="relative overflow-hidden m-2 sm:m-1 max-h-[600px]">
        {/* Background carousel */}
        <Carousel className="w-full">
            <CarouselContent>
                {backgroundImages.map((src, index) => (
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
                <h2 className="text-3xl font-bold text-center text-white">{category}</h2>
            </div>

            {/* Subcategories at the bottom */}
            <div className="w-full overflow-x-auto no-scrollbar mt-auto">
                <div className="flex space-x-2">
                    {subcategories.map((subcat, index) => (<button key={index}
                                                                   className="focus:outline-none"
                                                                   onClick={() => handleSubCatClick(subcat)}
                    >
                        <ProductCategory
                            title={subcat.name}
                            imageSrc={farmUrls[Math.floor(Math.random() * farmUrls.length)] || ''}
                            altText={`Subcategory ${subcat.name}`}
                        />
                    </button>))}
                </div>
            </div>
        </div>
    </div>);
};


export default CategoryHero;