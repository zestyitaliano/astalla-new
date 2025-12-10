import { COLLECTIONS } from "@astalla/types";

export type FieldType = "text" | "textarea" | "image" | "select" | "number" | "rich-text";

export interface FieldDefinition {
    name: string;
    label: string;
    type: FieldType;
    options?: string[]; // For select type
    required?: boolean;
}

export interface CollectionDefinition {
    id: string;
    label: string;
    fields: FieldDefinition[];
}

export const SCHEMA: Record<string, CollectionDefinition> = {
    [COLLECTIONS.AMENITIES]: {
        id: COLLECTIONS.AMENITIES,
        label: "Amenities",
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "description", label: "Description", type: "rich-text", required: true },
            { name: "icon", label: "Icon Link (or SVG Name)", type: "text", required: false },
            { name: "image", label: "Image", type: "image", required: false },
        ],
    },
    [COLLECTIONS.GALLERY]: {
        id: COLLECTIONS.GALLERY,
        label: "Gallery",
        fields: [
            { name: "url", label: "Image", type: "image", required: true },
            { name: "caption", label: "Caption", type: "text", required: false },
            {
                name: "category",
                label: "Category",
                type: "select",
                options: ["interior", "exterior", "amenity", "neighborhood"],
                required: true,
            },
        ],
    },
    [COLLECTIONS.NEIGHBORHOOD]: {
        id: COLLECTIONS.NEIGHBORHOOD,
        label: "Neighborhood",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "description", label: "Description", type: "rich-text", required: false },
            {
                name: "category",
                label: "Category",
                type: "select",
                options: ['dining', 'shopping', 'transit', 'parks', 'entertainment'],
                required: true,
            },
        ],
    },
    [COLLECTIONS.CONTACT]: {
        id: COLLECTIONS.CONTACT,
        label: "Contact",
        fields: [
            { name: "email", label: "Email", type: "text", required: true },
            { name: "phone", label: "Phone", type: "text", required: true },
            { name: "address", label: "Address", type: "textarea", required: true },
            { name: "officeHours", label: "Office Hours", type: "textarea", required: true },
        ],
    },
};
