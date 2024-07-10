import React, {useEffect, useState, useCallback} from 'react';
import ProductCard from '@/components/ProductCard';
import p from '@/db/products.json';

function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 10;

    const fetchProducts = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const productsArray = Object.keys(p).map(id => ({
                id,
                ...p[id]
            }));

            // Sort products only once
            if (page === 0) {
                productsArray.sort((a, b) => b.meta.createdAt - a.meta.createdAt);
            }

            const startIndex = page * LIMIT;
            const paginatedProducts = productsArray.slice(startIndex, startIndex + LIMIT);

            setProducts(prevProducts => [...prevProducts, ...paginatedProducts]);
            setPage(prevPage => prevPage + 1);
            setHasMore(paginatedProducts.length === LIMIT);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    }, [page, loading, hasMore]);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
            {hasMore && !loading && (
                <button onClick={fetchProducts} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Load More
                </button>
            )}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default ProductList;