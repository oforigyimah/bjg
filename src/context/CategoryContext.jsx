import {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCategories} from "@/lib/utils";

const CategoryContext = createContext(null);

export const CategoryProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();
    const [selectedSubCat, setSelectedSubCat] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    const {data: categories = [], error, isLoading} = useQuery('categories', fetchCategories, {
        staleTime: Infinity,
    });

    useEffect(() => {
        if (!categories) return;

        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('cat');
        if (!categoryParam) return;

        const matchedCategory = categories.find(cat => cat.id === categoryParam);
        if (matchedCategory) {
            setSelectedCategory(matchedCategory);
            setSubcategories(matchedCategory.sub || []);
        } else {
            setSelectedCategory(null);
            setSubcategories([]);
        }
    }, [location]);

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