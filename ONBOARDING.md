# Astalla Onboarding Guide

Welcome to Astalla, the decentralized property management CMS and website platform. This guide will help you spin up a new property instance.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A Firebase account

## Step 1: Project Setup

1.  **Duplicate/Fork this repository** or create a new branch for your property.
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

## Step 2: Firebase Configuration

1.  **Create a new Firebase Project** in the [Firebase Console](https://console.firebase.google.com/).
2.  **Enable Firestore Database**:
    - Start in **production mode**.
    - Choose a location near your users.
3.  **Enable Authentication**:
    - Go to Authentication -> Sign-in method.
    - Enable **Email/Password**.
    - (Optional) Enable Google Sign-In.
4.  **Create a Web App**:
    - Go to Project Settings -> General -> Your apps -> Add app (Web).
    - Copy the `firebaseConfig` object.

## Step 3: Environment Variables

Create `.env` files for both CMS and Web apps.

### CMS (`apps/cms/.env`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Web (`apps/web/.env`)
Same variables as above, pointing to the same Firebase project.

## Step 4: Security Rules

Deploy the basic security rules provided in `firestore.rules`.

```bash
# If you have firebase-tools installed
firebase deploy --only firestore:rules
```

Or copy the contents of `firestore.rules` into the Firebase Console -> Firestore Database -> Rules tab.

## Step 5: Initial Data Seeding

1.  Run the CMS locally:
    ```bash
    pnpm --filter cms dev
    ```
2.  Navigate to `http://localhost:3000/login`.
3.  Sign up/Login (since it's a new project, you might need to enable sign-up in your own tailored auth flow or manually create a user in Firebase Auth console first).
4.  Go to **Site Settings** in the dashboard and fill in:
    - Site Name
    - Brand Colors (Primary, Secondary, Accent)
5.  Go to **Pages -> Home** and fill in hero details.

## Step 6: Deploy

### CMS (Firebase Hosting)
Build the CMS:
```bash
pnpm --filter cms build
```
Deploy to Firebase Hosting (configured as a rewrites target or standalone).

### Web App (Vercel)
1.  Import the repository to Vercel.
2.  Set the **Root Directory** to `apps/web`.
3.  Add the Environment Variables from Step 3.
4.  Deploy.

## Customization

- **Theming**: Update `Site Settings` in the CMS to change the active colors on the website.
- **Content**: Use the CMS Dashboard to manage Amenities, Gallery, and Neighborhood locations.
