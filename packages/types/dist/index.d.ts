export interface SiteSettings {
    name: string;
    brandColors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    typography: {
        headingFont: string;
        bodyFont: string;
    };
    logoUrl: string;
    navLinks: Array<{
        label: string;
        url: string;
    }>;
}
export interface HomepageData {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    highlights: string[];
    cta: {
        label: string;
        url: string;
    };
}
export interface Amenity {
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
}
export interface GalleryItem {
    id: string;
    url: string;
    caption?: string;
    category: 'interior' | 'exterior' | 'amenity' | 'neighborhood';
}
export interface NeighborhoodLocation {
    id: string;
    name: string;
    category: 'dining' | 'shopping' | 'transit' | 'parks' | 'entertainment';
    description?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}
export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
    officeHours: string;
}
export declare const COLLECTIONS: {
    readonly SITE_SETTINGS: "site_settings";
    readonly PAGES: "pages";
    readonly AMENITIES: "amenities";
    readonly GALLERY: "gallery";
    readonly NEIGHBORHOOD: "neighborhood";
    readonly CONTACT: "contact";
};
