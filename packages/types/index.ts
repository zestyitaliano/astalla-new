// Astalla Data Models

// Astalla Data Models

export interface BaseEntity {
    id: string;
    createdAt: number; // Timestamp
    updatedAt: number; // Timestamp
}

export type Role = 'admin' | 'editor' | 'viewer';

export interface User extends BaseEntity {
    email: string;
    displayName?: string;
    photoURL?: string;
    role: Role;
}

export interface Asset extends BaseEntity {
    url: string;
    filename: string;
    mimeType: string;
    size: number;
}

// -- Site Settings (Singleton) --
export interface SiteSettings extends BaseEntity {
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
    navLinks: Array<{ label: string; url: string }>;
}

// -- Homepage (Singleton) --
export interface HomepageData extends BaseEntity {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    highlights: string[]; // Array of strings for bullet points
    cta: {
        label: string;
        url: string;
    };
}

// -- Amenities (Collection) --
export interface Amenity extends BaseEntity {
    id: string;
    title: string;
    description: string;
    icon: string; // URL or icon name
    image?: string; // Optional image URL
}

// -- Gallery (Collection) --
export interface GalleryItem extends BaseEntity {
    id: string;
    url: string;
    caption?: string;
    category: 'interior' | 'exterior' | 'amenity' | 'neighborhood';
}

// -- Neighborhood (Collection) --
export interface NeighborhoodLocation extends BaseEntity {
    id: string;
    name: string;
    category: 'dining' | 'shopping' | 'transit' | 'parks' | 'entertainment';
    description?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

// -- Contact (Singleton) --
export interface ContactInfo extends BaseEntity {
    phone: string;
    email: string;
    address: string;
    officeHours: string; // Could be structured, but string is flexible for MVP
}

// -- Firestore Collection Names --
export const COLLECTIONS = {
    SITE_SETTINGS: 'site_settings',
    PAGES: 'pages',
    AMENITIES: 'amenities',
    GALLERY: 'gallery',
    NEIGHBORHOOD: 'neighborhood',
    CONTACT: 'contact',
} as const;

export const DOC_IDS = {
    SITE_SETTINGS: 'default',
    HOME_PAGE: 'home',
    CONTACT: 'contact',
} as const;
