# Neroli — A Mediterranean Fragrance House

A premium perfume e-commerce frontend built with React, Vite, Tailwind CSS v4, Framer Motion, and Firebase.

## Brand Rebrand Notes

This project replaces the previous "Velora" website with a fully new brand and a fully new codebase
(React/Vite/Tailwind instead of vanilla HTML/CSS/JS). **The same Firebase project is reused** —
only the frontend has changed. See `src/firebase/config.js` for the existing config.

Admin email is now `admin@neroli.house` (changeable in `src/firebase/config.js` → `ADMIN_EMAIL`).

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (CSS-first theme config, no `tailwind.config.js` needed — see `src/index.css`)
- React Router v7
- Framer Motion (page/section animations)
- Lucide React (icons)
- Firebase (Auth + Firestore)

## Project Structure

```
src/
├── assets/            Static images/icons (if any local ones are added)
├── components/        Reusable UI: Navbar, Footer, ProductCard, Button, drawers, etc.
├── sections/           Homepage sections: Hero, Features, CollectionsGrid, BrandStory, etc.
├── layouts/            SiteLayout (public site) & AdminLayout (admin panel)
├── pages/               Route-level pages: Home, Shop, ProductDetail, Checkout, Account…
│   └── admin/            Admin dashboard, products, inventory, orders
├── context/             StoreContext (cart/wishlist), AuthContext (Firebase auth)
├── hooks/                (reserved for future custom hooks)
├── utils/                Firestore helper functions (orders.js, products.js)
├── firebase/             Firebase config & initialization
└── data/                 Local sample product/collection data (used until Firestore is fully populated)
```

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Firebase Setup

1. **Authentication** → enable Email/Password sign-in.
2. **Firestore** → create `products` and `orders` collections (auto-created on first write).
3. Create an account with email **admin@neroli.house** — this becomes the admin user automatically.
4. Sign in as admin and visit `/admin` to add real products (the site currently shows local sample
   data in `src/data/products.js` for the homepage/shop browsing — wire `getAllProducts()` from
   `src/utils/products.js` into `Shop.jsx`/`Home.jsx` once your catalog is populated in Firestore).

### Recommended Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@neroli.house';
    }
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.auth.token.email == 'admin@neroli.house');
    }
  }
}
```

## Design System

All design tokens (colors, fonts, radii) live in `src/index.css` under `@theme`, using Tailwind v4's
CSS-first configuration. Update colors there to keep the whole app in sync — no separate
`tailwind.config.js` is needed.

| Token | Value |
|---|---|
| `bg-primary` | `#F7F5F1` |
| `bg-secondary` | `#F1ECE3` |
| `olive` | `#6F7050` |
| `olive-hover` | `#5C5E42` |
| `gold` | `#B89B63` |
| `text-primary` | `#2E2E2B` |
| `text-secondary` | `#707070` |
| `border` | `#E6E0D7` |

Headings use **Cormorant Garamond**, body text uses **Inter**.

## Build

```bash
npm run build
npm run preview
```
