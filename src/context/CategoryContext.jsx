import {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCategories} from "@/lib/utils";

const CategoryContext = createContext(null);

export const CategoryProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();
    const [selectedSubCat, setSelectedSubCat] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    const { data: categories = [], error, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (!categories || categories.length === 0) return;

        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('cat');
        if (!categoryParam) {
            setSelectedCategory(null);
            setSubcategories([]);
            return;
        }

        const matchedCategory = categories.find(cat => cat.id === categoryParam);
        if (matchedCategory) {
            setSelectedCategory(matchedCategory);
            setSubcategories(matchedCategory.sub || []);
        } else {
            setSelectedCategory(null);
            setSubcategories([]);
        }
    }, [location.search, categories]);

    const value = {
        selectedCategory,
        setSelectedCategory,
        selectedSubCat,
        setSelectedSubCat,
        subcategories,
        setSubcategories,
        categories,
        isLoading,
        error
    }

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);