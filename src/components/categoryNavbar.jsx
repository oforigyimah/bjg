import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Button} from "@/components/ui/button";
import {useQuery} from "react-query";
import {fetchCategories} from "@/lib/utils";

const CategoryNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {data: categories, error, isLoading} = useQuery('categories', fetchCategories, {
        staleTime: Infinity,
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl && categories) {
            console.log("categoryFromUrl", categoryFromUrl, "categories", categories);
            const category = categories.find(c => c.id && c.id === categoryFromUrl);
            setSelectedCategory(category || null);
        } else {
            setSelectedCategory(null);
        }
    }, [location, categories]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate(`?category=${encodeURIComponent(category.id)}`);
    };

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories: {error.message}</div>;

    return (
        <nav className="mt-2 lg:mt-20 bg-gray-50 p-2 pt-0 navbarSecond">
            <div className="w-full h-42 overflow-y-scroll no-scrollbar py-4 px-2 -mx-2 whitespace-nowrap">
                {categories && categories.map((category, index) => (
                    category && category.name ? (
                        <Button
                            key={index}
                            variant={selectedCategory?.name === category.name ? "default" : "ghost"}
                            className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full mr-4"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                        </Button>
                    ) : null
                ))}
            </div>
        </nav>
    );
};

export default CategoryNavbar;