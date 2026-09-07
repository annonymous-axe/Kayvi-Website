# Kayvi Solar Website

This is a premium, localized Next.js 15 App Router website powered by a Headless Strapi CMS. It includes dynamic UI elements like responsive navigation, robust forms, interactive calculators, and masonry galleries.

## 🏗 Architecture

- **Frontend**: [Next.js 15](https://nextjs.org) (App Router), React 19, Tailwind CSS v4, Framer Motion
- **CMS (Backend)**: [Strapi v5](https://strapi.io)
- **Database**: PostgreSQL (Dockerized)
- **Localization**: `next-intl` (Supports English `/en` and Spanish `/es` by default)

---

## 🚀 Getting Started & Testing Locally

To run the entire platform locally, you need to spin up the Database, the CMS, and the Next.js website.

### 1. Start the PostgreSQL Database (Docker)
Ensure Docker Desktop is open and running on your machine.
```bash
# Navigate to the CMS directory
cd ../cms

# Spin up the database in detached mode
docker-compose up -d
```

### 2. Start the Strapi CMS
The CMS powers the content for the Blog, FAQ, Testimonials, Projects, Careers, and Certificates pages.
```bash
# Ensure you are still in the cms directory
cd ../cms

# Start the Strapi development server
npm run dev
```
- **Admin Panel**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **GraphQL Endpoint**: [http://localhost:1337/graphql](http://localhost:1337/graphql)

### 3. Start the Next.js Website
Open a new terminal window for the frontend.
```bash
# Navigate to the website directory
cd website

# Start the Next.js development server
npm run dev
```
- **Website Live URL**: [http://localhost:3000](http://localhost:3000)

---

## 📝 Testing the CMS Integration

1. Go to the Next.js website at [http://localhost:3000/en/blog](http://localhost:3000/en/blog).
2. Open the Strapi Admin Panel at [http://localhost:1337/admin](http://localhost:1337/admin) and log in.
3. Navigate to **Content Manager** -> **Blog Posts**.
4. Make an edit to a post's title or content.
5. Hit **Save** and **Publish**.
6. Refresh your Next.js website page to see the GraphQL data propagate instantly!

*(Note: Images uploaded via Strapi will be served locally from `localhost:1337`. If you are moving to production, you will want to configure a Cloudinary provider for Strapi to persist images)*.

---

## 🌎 Internationalization (i18n)

This project uses route-based internationalization via `next-intl`.
- English: `http://localhost:3000/en/...`
- Spanish: `http://localhost:3000/es/...`

Translations for static elements (hero text, button labels, calculator labels) are stored in `website/messages/en.json` and `es.json`.
Dynamic content (like Blog Posts and FAQs) is translated directly within the Strapi CMS via the **i18n plugin**.
