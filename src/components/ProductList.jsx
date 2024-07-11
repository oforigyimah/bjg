import React, {useEffect, useState} from 'react';
import ProductCard from '@/components/ProductCard';
import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchAllProducts, fetchCategories, fetchCategoryProducts} from "@/lib/utils";

function ProductList(props) {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get('category');

    const {
        data: categories,
        error: categoriesError,
        isLoading: categoriesLoading
    } = useQuery('categories', fetchCategories, {
        staleTime: Infinity,
    });

    useEffect(() => {
        if (categoryFromUrl && categories) {
            const category = categories.find(c => c.id === categoryFromUrl);
            setSelectedCategory(category || null);
        } else {
            setSelectedCategory(null);
        }
    }, [categoryFromUrl, categories]);

    const {
        data: allProducts,
        error: allProductsError,
        isLoading: allProductsLoading
    } = useQuery('allProducts', fetchAllProducts, {
        staleTime: Infinity,
        enabled: !categoryFromUrl || (categoryFromUrl && !selectedCategory), // Only fetch all products if no category is selected or the category is invalid
    });

    const {data: categoryProducts, error: categoryProductsError, isLoading: categoryProductsLoading} = useQuery(
        [selectedCategory?.name, categoryFromUrl],
        () => fetchCategoryProducts(categoryFromUrl),
        {
            staleTime: Infinity,
            enabled: !!categoryFromUrl && !!selectedCategory, // Only fetch category products if a valid category is selected
        }
    );

    if (categoriesLoading) return <div>Loading categories...</div>;
    if (categoriesError) return <div>Error loading categories: {categoriesError.message}</div>;
    if (categoryFromUrl && selectedCategory) {
        if (categoryProductsLoading) return <div>Loading products...</div>;
        if (categoryProductsError) return <div>Error loading products: {categoryProductsError.message}</div>;
    } else {
        if (allProductsLoading) return <div>Loading products...</div>;
        if (allProductsError) return <div>Error loading products: {allProductsError.message}</div>;
    }

    const productsToDisplay = categoryFromUrl && selectedCategory ? categoryProducts : allProducts;

    return (
        <div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                {productsToDisplay.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
