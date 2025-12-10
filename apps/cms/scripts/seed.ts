import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, writeBatch } from "firebase/firestore";
import { getAuth, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { COLLECTIONS } from "@astalla/types";
import * as dotenv from "dotenv";

const DOC_IDS = {
    SITE_SETTINGS: 'default',
    HOME_PAGE: 'home',
    CONTACT: 'contact',
};

console.log("Starting seed script...");

// Load env vars from .env.local if running locally
// Try common locations
const envPaths = [".env.local", "apps/cms/.env.local", "apps/web/.env.local", "apps/web/.env"];
for (const path of envPaths) {
    const result = dotenv.config({ path });
    if (result.error) continue;
    console.log(`Loaded env from ${path}`);
}

console.log("Firebase Config Check:", {
    apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

console.log("COLLECTIONS:", COLLECTIONS);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function seed() {
    console.log("Authenticating...");
    try {
        // Try anonymous first
        await signInAnonymously(auth);
        console.log("Signed in anonymously.");
    } catch (e) {
        console.log("Anon auth failed, trying to create temp admin...");
        try {
            // Fallback: create temp user
            await createUserWithEmailAndPassword(auth, "seed-admin@astalla.com", "password123");
            console.log("Created temp admin.");
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                await signInWithEmailAndPassword(auth, "seed-admin@astalla.com", "password123");
                console.log("Signed in as existing temp admin.");
            } else {
                console.error("Auth failed:", err);
                return;
            }
        }
    }

    console.log("Seeding Smith & Porter data...");
    const batch = writeBatch(db);

    // 1. Site Settings
    const settingsRef = doc(db, COLLECTIONS.SITE_SETTINGS, DOC_IDS.SITE_SETTINGS);
    batch.set(settingsRef, {
        name: "Smith & Porter",
        logoUrl: "", // Text fallback or add URL if available
        brandColors: {
            primary: "#756350", // Bronze
            secondary: "#F7F5F2", // Sand
            accent: "#8C7B68",
            background: "#F7F5F2",
            text: "#18181b"
        },
        typography: {
            headingFont: "Playfair Display",
            bodyFont: "Plus Jakarta Sans"
        },
        navLinks: [
            { label: "Home", url: "/" },
            { label: "Amenities", url: "/amenities" },
            { label: "Gallery", url: "/gallery" },
            { label: "Neighborhood", url: "/neighborhood" },
            { label: "Contact", url: "/contact" }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    // 2. Homepage
    const homeRef = doc(db, COLLECTIONS.PAGES, DOC_IDS.HOME_PAGE);
    batch.set(homeRef, {
        heroTitle: "Smith & Porter",
        heroSubtitle: "Timeless luxury in the heart of Atlanta. Experience a residence that blends historic charm with modern sophistication.",
        heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", // Exterior / Lobby vibe
        highlights: [
            "Resort-style saltwater pool",
            "State-of-the-art fitness center",
            "Sky lounge with city views"
        ],
        cta: {
            label: "View Availability",
            url: "/contact"
        },
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    // 3. Contact
    const contactRef = doc(db, COLLECTIONS.CONTACT, "contact"); // Using "contact" as ID per request/impl
    batch.set(contactRef, {
        email: "leasing@smithandporter.com",
        phone: "(404) 555-0123",
        address: "123 Castleberry St SW, Atlanta, GA 30313",
        officeHours: "Mon-Fri: 9am - 6pm\nSat: 10am - 5pm\nSun: 1pm - 5pm",
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    await batch.commit();
    console.log("Singletons seeded (Settings, Home, Contact).");

    // 4. Amenities (Collection)
    const amenitiesData = [
        {
            title: "Saltwater Pool",
            description: "Relax in our resort-style saltwater pool with a sun shelf and poolside cabanas.",
            icon: "pool",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Fitness Center",
            description: "24/7 fitness center equipping with cardio, strength training, and yoga studio.",
            icon: "gym",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Sky Lounge",
            description: "Entertain guests in our rooftop resident lounge offering panoramic city views.",
            icon: "coffee",
            image: "https://images.unsplash.com/photo-1522771753062-5a31a5043a53?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Co-Working Space",
            description: "Productivity meets comfort with private meeting rooms and high-speed fiber internet.",
            icon: "wifi",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
        }
    ];

    for (const item of amenitiesData) {
        await addDoc(collection(db, COLLECTIONS.AMENITIES), {
            ...item,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }

    // 5. Gallery (Collection)
    const galleryData = [
        { url: "https://images.unsplash.com/photo-1620626012053-15998e94a63d?auto=format&fit=crop&q=80&w=800", caption: "Resident Lounge", category: "interior" },
        { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800", caption: "Modern Kitchen", category: "interior" },
        { url: "https://images.unsplash.com/photo-1484154218962-a1c00207099b?auto=format&fit=crop&q=80&w=800", caption: "Spacious Bedroom", category: "interior" },
        { url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb8?auto=format&fit=crop&q=80&w=800", caption: "Pool Deck at Night", category: "amenity" },
        { url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b925?auto=format&fit=crop&q=80&w=800", caption: "Castleberry Hill Views", category: "neighborhood" },
        { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", caption: "Lobby", category: "interior" }
    ];

    for (const item of galleryData) {
        await addDoc(collection(db, COLLECTIONS.GALLERY), {
            ...item,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }

    // 6. Neighborhood (Collection)
    const neighborhoodData = [
        { name: "No Mas! Cantina", category: "dining", description: "Vibrant Mexican eatery with artisan decor and a sprawling patio." },
        { name: "Mercedes-Benz Stadium", category: "entertainment", description: "World-class sports and entertainment venue just blocks away." },
        { name: "Centennial Olympic Park", category: "parks", description: "The city's legacy park offering lush greenspace and fountains." },
        { name: "Boxcar at Hop City", category: "dining", description: "Craft beer and casual eats in a historic setting." }
    ];

    for (const item of neighborhoodData) {
        await addDoc(collection(db, COLLECTIONS.NEIGHBORHOOD), {
            ...item,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }

    console.log("Collections seeded (Amenities, Gallery, Neighborhood). Done!");
}

seed().catch(console.error);
