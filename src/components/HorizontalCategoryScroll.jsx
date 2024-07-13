import {useState} from 'react';
import {Button} from "@/components/ui/button";

const exampleCategories = {
    "Electronics": "Explore our wide range of electronics, from smartphones to smart home devices.",
    "Books": "Dive into a world of literature with our extensive collection of books across all genres.",
    "Clothing": "Stay stylish with our trendy clothing options for all ages and occasions.",
    "Home & Garden": "Transform your living space with our home decor and gardening essentials.",
    "Sports": "Get active with our sports equipment and accessories for every athlete.",
    "Toys": "Find the perfect toys to entertain and educate children of all ages.",
    "Beauty": "Enhance your natural beauty with our premium cosmetics and skincare products.",
    "Automotive": "Keep your vehicle running smoothly with our automotive parts and accessories."
};

const categories = Object.keys(exampleCategories);

const HorizontalCategoryScroll = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="flex flex-col h-screen">
            <div className="relative flex-none" style={{height: '100px'}}>
                <div className="flex overflow-x-auto scrollbar-hide py-4 px-2 space-x-4" style={{height: '100%'}}>
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            variant={selectedCategory === category ? "default" : "ghost"}
                            className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
                    <p>{}</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCategoryScroll;