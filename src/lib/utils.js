import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {collection, doc, getDoc, getDocs, limit, query, where} from "firebase/firestore";
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
    return await getDownloadURL(imageRef);
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
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
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
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchLocations() {
  try {
    const docRef = doc(db, 'data', 'regions');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && data.regions) {
        return data.regions;
      } else {
        console.log("No regions found");
        return [];
      }
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (e) {
    console.error("Error fetching locations:", e);
    throw e;
  }
}
