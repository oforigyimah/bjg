import ProductCard from '@/components/ProductCard';
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchCategoryProducts } from "@/lib/utils";
import { useCategory } from "@/context/CategoryContext";

function ProductList() {
    const categoryContext = useCategory();

    if (!categoryContext) {
        console.error('useCategory returned undefined');
        return <div>Error: Category data is unavailable. Please try refreshing the page.</div>;
    }

    const {
        selectedCategory,
        isLoading: categoriesLoading,
        error: categoriesError
    } = categoryContext;

    const allProductsQuery = useQuery({
        queryKey: ['allProducts'],
        queryFn: fetchAllProducts,
        staleTime: Infinity,
    });

    const categoryProductsQuery = useQuery({
        queryKey: ['categoryProducts', selectedCategory?.id],
        queryFn: () => fetchCategoryProducts(selectedCategory.id),
        staleTime: Infinity,
        enabled: !!selectedCategory?.id,
    });

    if (categoriesLoading) return <div>Loading categories...</div>;
    if (categoriesError) return <div>Error loading categories: {categoriesError.message}</div>;

    if (allProductsQuery.isLoading || categoryProductsQuery.isLoading) return <div>Loading products...</div>;
    if (allProductsQuery.error) return <div>Error loading products: {allProductsQuery.error.message}</div>;
    if (categoryProductsQuery.error) return <div>Error loading category products: {categoryProductsQuery.error.message}</div>;

    const productsToDisplay = selectedCategory && categoryProductsQuery.data ? categoryProductsQuery.data : allProductsQuery.data;

    return (
        <div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                {productsToDisplay && productsToDisplay.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;