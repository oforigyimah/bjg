import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {collection, getDocs, limit, query, where} from "firebase/firestore";
import {db, storage} from "@/firebaseConfig";
import {getDownloadURL, ref} from "firebase/storage";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export async function fetchCategories() {
  try {
    const categoriesCollection = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesData = categoriesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return categoriesData[0]["categories"];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getImageUrl(path) {
  const imageRef = ref(storage, path);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return '';
  }
}


export async function fetchSubCatImages(subcategories) {
  const subCatImages = {};

  await Promise.all(subcategories.map(async (subcat) => {
    const urls = await Promise.all(subcat.images.map(imagePath => getImageUrl(imagePath)));
    subCatImages[subcat.id] = urls.length ? urls[0] : urls;
    console.log(subCatImages[subcat.id]);
  }));

  return subCatImages;
}

export async function fetchCategoryProducts(categoryId) {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('category.id', '==', categoryId), limit(20));
    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return productsData;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchAllProducts() {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, limit(20));
    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return productsData;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}