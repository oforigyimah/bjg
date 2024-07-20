import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";
import {Plus, X} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchLocations} from "@/lib/utils.js";

const PostAdForm1 = () => {
    const {data: locations, isLoading, isError, error} = useQuery({
        queryFn: fetchLocations,
        queryKey: ["locations"],
        staleTime: Infinity,
    });

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    if (isLoading) {
        console.log("Loading locations...");
    }

    if (isError) {
        console.log(error);
    }

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Post ad</h1>
            <form className="space-y-4">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Category*"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="farm-animals">Farm Animals</SelectItem>
                        {/* Add more categories as needed */}
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Location*"/>
                    </SelectTrigger>
                    <SelectContent>
                        {locations?.map((location) => (
                            <React.Fragment key={location.code}>
                                <SelectItem value={location.code}>
                                    {location.capital}
                                </SelectItem>
                                {location.districts && location.districts.length > 0 && (
                                    <SelectGroup>
                                        {location.districts.map((district) => (
                                            <SelectItem key={district.code} value={district.code}>
                                                {district.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                )}
                            </React.Fragment>
                        ))}
                    </SelectContent>
                </Select>

                <div>
                    <p className="text-sm font-medium mb-2">Add photo</p>
                    <p className="text-sm text-gray-500 mb-2">Add at least 1 photo for this category</p>
                    <p className="text-sm text-gray-500 mb-2">
                        First picture - is the title picture. You can change the order of photos: just grab your photos
                        and drag
                    </p>
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
                                <img src={image.preview} alt={`Upload ${index + 1}`}
                                     className="w-full h-full object-cover"/>
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
                            className="w-24 h-24 flex items-center justify-center bg-green-50 hover:bg-green-100 cursor-pointer"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <CardContent>
                                <Plus className="w-8 h-8 text-green-500"/>
                            </CardContent>
                        </Card>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Supported formats are *.jpg and *.png</p>
                </div>

                <Input type="text" placeholder="Link to Youtube video"/>

                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Next</Button>
            </form>
        </div>
    );
};

export default PostAdForm1;
