import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import categories from "@/db/categories.json";
import {Button} from "@/components/ui/button";

const SecondaryNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            const category = categories.find(c => c.name === categoryFromUrl);
            if (category) {
                setSelectedCategory(category);
            }
        } else {
            setSelectedCategory(null);
        }
    }, [location]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate(`?category=${category.name}`);
    };

    return (
        <nav className="mt-2 lg:mt-20 bg-gray-50 p-2 pt-0 navbarSecond">
            <div className="w-full h-42 overflow-y-scroll no-scrollbar py-4 px-2 -mx-2 whitespace-nowrap">
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        variant={selectedCategory?.name === category.name ? "default" : "ghost"}
                        className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full mr-4"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
        </nav>
    );
};

export default SecondaryNavbar;