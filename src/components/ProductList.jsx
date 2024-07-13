import  {useEffect} from 'react';
import ProductCard from '@/components/ProductCard';
import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchAllProducts, fetchCategoryProducts} from "@/lib/utils";
import {useCategory} from "@/context/CategoryContext";

function ProductList() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get('cat');



    const {
        data: allProducts,
        error: allProductsError,
        isLoading: allProductsLoading
    } = useQuery('allProducts', fetchAllProducts, {
        staleTime: Infinity,
    });

    const {
        data: categoryProducts,
        error: categoryProductsError,
        isLoading: categoryProductsLoading
    } = useQuery(['categoryProducts', categoryFromUrl], () => fetchCategoryProducts(categoryFromUrl), {
        staleTime: Infinity,
        enabled: !!categoryFromUrl,
    });


    const categoryContext = useCategory();

    if (!categoryContext) {
        console.error('useCategory returned undefined');
        // return <div>Error: Category data is unavailable. Please try refreshing the page.</div>;
    }

    const {
        selectedCategory, setSelectedCategory, categories, isLoading: categoriesLoading, error: categoriesError
    } = categoryContext;

    useEffect(() => {
        if (categoryFromUrl && categories) {
            const category = categories.find(cat => cat.name === categoryFromUrl);
            setSelectedCategory(category || null);
        }
    }, [categoryFromUrl, categories, setSelectedCategory]);

    if (categoriesLoading) return <div>Loading categories...</div>;
    if (categoriesError) return <div>Error loading categories: {categoriesError.message}</div>;

    if (allProductsLoading || (categoryFromUrl && categoryProductsLoading)) return <div>Loading products...</div>;
    if (allProductsError) return <div>Error loading products: {allProductsError.message}</div>;
    if (categoryFromUrl && categoryProductsError) return <div>Error loading category
        products: {categoryProductsError.message}</div>;

    const productsToDisplay = categoryFromUrl && selectedCategory && categoryProducts ? categoryProducts : allProducts;

    return (
        <div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                {productsToDisplay && productsToDisplay.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default ProductList;