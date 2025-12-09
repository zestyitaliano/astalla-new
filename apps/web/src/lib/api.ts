import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTIONS, Amenity, GalleryItem, NeighborhoodLocation } from "@astalla/types";

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
