export const siteConfig = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Kayvi Solar",
  tagline: process.env.NEXT_PUBLIC_TAGLINE || "Powering a Brighter Future",
  phone: process.env.NEXT_PUBLIC_PHONE || "+1 (555) 123-4567",
  email: process.env.NEXT_PUBLIC_EMAIL || "contact@kayvisolar.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "123 Solar Way, Sunny City, SC 12345",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+15551234567",
  socialLinks: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com",
  }
}

export type SiteConfig = typeof siteConfig;
