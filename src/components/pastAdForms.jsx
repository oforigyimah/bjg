import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {Plus, X} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchCategories, fetchLocations} from "@/lib/utils.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import ComboboxLoc from "@/components/ComboboxLoc.jsx";
import ComboboxCat from "@/components/ComboboxCat.jsx";

const FormSchema = z.object({
    category: z.string({required_error: "Please select a category."}),
    images: z.array(z.string()).min(2, "Please add at least 2 images."),
    location: z.string({required_error: "Please select a location."}),
    description: z.string().min(10, {message: "Description must be at least 10 characters long"}),
    title: z.string().min(10, {message: "Product title must be at least 10 characters long"}),
    // price: z.number().min(0.01, { message: "Price must be higher than 0" }),
    quantity: z.number().min(1, {message: "Quantity must be more than 0"}),
});

const CombinedForm = () => {
    const {
        data: locations,
        isLoading: isLoadingLocations,
        isError: isErrorLocations,
        error: errorLocations
    } = useQuery({
        queryFn: fetchLocations,
        queryKey: ["locations"],
        staleTime: Infinity,
    });

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useQuery({
        queryFn: fetchCategories,
        queryKey: ["categories"],
        staleTime: Infinity,
    });

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            category: "",
            images: [],
            location: "",
            title: "",
            description: "",
            price: 0,
            quantity: 1,
        },
    });

    const onSubmit = (data) => {
        localStorage.setItem("postAdForm", JSON.stringify(data));
        toast({
            title: "Form submitted",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        console.log(data);
    };

    if (isLoadingLocations || isLoadingCategories) return <p>Loading...</p>;
    if (isErrorLocations || isErrorCategories) return <p>Error: {errorLocations?.message || errorCategories?.message}</p>;

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({file, preview: URL.createObjectURL(file)}));
        setImages((prevImages) => [...prevImages, ...newImages]);
        form.setValue("images", [...form.getValues("images"), ...newImages.map((img) => img.preview)]);
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        form.setValue("images", form.getValues("images").filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <ComboboxCat field={field} categories={categories}/>
                                <FormDescription>Select a category for your ad</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <ComboboxLoc field={field} locations={locations}/>
                                <FormDescription>Select a location for your ad</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem>
                                <FormLabel>Add Photos</FormLabel>
                                <FormDescription>
                                    Add at least 2 photos for this category. The first picture is the title picture. You
                                    can change the order of photos by dragging them.
                                </FormDescription>
                                <FormControl>
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/jpeg,image/png"
                                            multiple
                                            className="hidden"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {images.map((image, index) => (
                                                <Card key={index} className="w-24 h-24 relative">
                                                    <img
                                                        src={image.preview}
                                                        alt={`Upload ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        className="absolute top-0 right-0 w-6 h-6"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <X className="w-4 h-4"/>
                                                    </Button>
                                                </Card>
                                            ))}
                                            <Card
                                                className="w-24 h-24 flex items-center justify-center bg-blue-50 hover:bg-blue-100 cursor-pointer"
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <CardContent>
                                                    <Plus className="w-8 h-8 text-blue-500"/>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>Supported formats are *.jpg and *.png</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title*" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display title.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description*" {...field} />
                                </FormControl>
                                <FormDescription>Provide a detailed description of the product.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Price*"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        onInput={(e) => form.setValue("price", parseFloat(e.target.value))}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Set a price for the product.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Quantity*"
                                        type="number"
                                        min="1"
                                        onInput={(e) => form.setValue("quantity", parseInt(e.target.value, 10))}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Specify the quantity available.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CombinedForm;
