import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTIONS, Amenity, GalleryItem, NeighborhoodLocation, SiteSettings, HomepageData } from "@astalla/types";
import { DOC_IDS } from "./constants";

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const docRef = doc(db, COLLECTIONS.SITE_SETTINGS, DOC_IDS.SITE_SETTINGS);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SiteSettings;
        }
        return null;
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return null;
    }
}

export async function getHomePage(): Promise<HomepageData | null> {
    try {
        const docRef = doc(db, COLLECTIONS.PAGES, DOC_IDS.HOME_PAGE);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as HomepageData;
        }
        return null;
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return null;
    }
}

export async function getAmenities(): Promise<Amenity[]> {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.AMENITIES));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Amenity));
    } catch (error) {
        console.error("Error fetching amenities:", error);
        return [];
    }
}

export async function getGallery(): Promise<GalleryItem[]> {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.GALLERY));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
}

export async function getNeighborhood(): Promise<NeighborhoodLocation[]> {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.NEIGHBORHOOD));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NeighborhoodLocation));
    } catch (error) {
        console.error("Error fetching neighborhood:", error);
        return [];
    }
}
