import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/CategoryContext";

const CategoryNavbar = () => {
    const navigate = useNavigate();
    const categoryContext = useCategory();

    if (!categoryContext) {
        console.error('useCategory returned undefined');
        return <div>Error: Category data is unavailable. Please try refreshing the page.</div>;
    }

    const {
        selectedCategory,
        setSelectedCategory,
        categories,
        isLoading,
        error
    } = categoryContext;

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate(`?cat=${encodeURIComponent(category.id)}`, { replace: true });
    };

    if (isLoading) {
        return <div className="mt-2 lg:mt-20 p-4">Loading categories...</div>;
    }

    if (error) {
        return <div className="mt-2 lg:mt-20 p-4 text-red-500">Error loading categories: {error.message}</div>;
    }

    if (!categories || categories.length === 0) {
        return <div className="mt-2 lg:mt-20 p-4">No categories available.</div>;
    }

    return (
        <nav className="mt-2 lg:mt-20 bg-gray-50 p-2 pt-0 navbarSecond">
            <div className="w-full h-42 overflow-y-scroll no-scrollbar py-4 px-2 -mx-2 whitespace-nowrap">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategory?.id === category.id ? "default" : "ghost"}
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

export default CategoryNavbar;