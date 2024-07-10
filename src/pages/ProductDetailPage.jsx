import {useParams} from "react-router-dom";
import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Img} from "react-image"
import {AspectRatio} from "@/components/ui/aspect-ratio"
import NavbarV0 from "@/components/NavbarV0";
import products from "@/db/products.json"


const ProductDetailPage = () => {
    const {id} = useParams();
    const product = products[Number(id)]
    useEffect(() => {

    }, []);
    return (
        <div>
            <NavbarV0></NavbarV0>
            <div className="max-w-4xl mx-auto p-4">
                <div className="mb-4">
                <span
                    className="text-sm text-gray-500">All Products &gt; Category &gt; Subcategory &gt; {product.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <AspectRatio
                            ratio={400 / 400}
                            className={"h-400 w-400"}

                        >
                            <Img
                                src={product.images[0]}
                                alt="Product"
                                className="w-full rounded-lg"/>
                        </AspectRatio>
                        <div className="flex mt-2">
                            <SubImages
                                product={product}
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                        <div className="mb-4">
                            <span className="text-3xl font-bold">GHS {product.price}</span>
                            <Badge variant="secondary" className="ml-2">Price History</Badge>
                        </div>

                        <Card className="mb-4">
                            <CardHeader>
                                <CardTitle>Seller Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Seller Name</p>
                                <p>Verified ID</p>
                                <Button className="w-full mt-2">Show contact</Button>
                                <Button variant="outline" className="w-full mt-2">Start chat</Button>
                            </CardContent>
                        </Card>

                        <Button className="w-full mb-2">Request call back</Button>

                        <Card>
                            <CardHeader>
                                <CardTitle>Safety tips</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-4">
                                    <li>Meet with the seller at a safe public place</li>
                                    <li>Inspect the item before buying</li>
                                    <li>Pay only after receiving the item</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Product Details</h2>
                    <dl className="grid grid-cols-2 gap-2">
                        <dt className="font-semibold">Brand:</dt>
                        <dd>Brand Name</dd>
                        <dt className="font-semibold">Type:</dt>
                        <dd>Product Type</dd>
                        <dt className="font-semibold">Features:</dt>
                        <dd>Feature 1, Feature 2, Feature 3</dd>
                    </dl>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Description</h2>
                    <p>This is where the product description would go. It can include multiple paragraphs describing the
                        product's features, benefits, and any other relevant information.</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Similar Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-4">
                                    <AspectRatio
                                        ratio={150 / 150}
                                        className={"w-150 h-150"}
                                    >
                                        <Img src={`/api/placeholder/150/150`} alt={`Similar Product ${i}`}
                                             className="w-full rounded-md mb-2"/>
                                    </AspectRatio>
                                    <p className="font-semibold">Similar Product {i}</p>
                                    <p className="text-sm text-gray-500">$XX.XX</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

function SubImages({product}) {
    console.log(product.images[0]);
    return (<>
        {product.images.map((i) => (
            <AspectRatio
                key={i}
                ratio={80 / 80}
                className={"w-80 h-80"}
            >
                <Img src={product.images[i]} alt="Thumbnail 1" className="w-20 h-20 rounded-md mr-2"/>
            </AspectRatio>
        ))}
    </>)
}

export default ProductDetailPage;