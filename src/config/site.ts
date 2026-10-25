export const siteConfig = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Kayvi Solar",
  tagline: process.env.NEXT_PUBLIC_TAGLINE || "Powering a Brighter Future",
  /**
   * Centralized Business Logo Configuration.
   * Changing this configuration or replacing the files in public/images/
   * automatically updates the logo across the entire website (Navbar, Footer,
   * About story, Quote calculator modal, and Metadata/Favicon).
   */
  logo: {
    src: "/images/logo.png",
    srcDark: "/images/logo-dark.png",
    mark: "/images/logo-mark.png",
    alt: "Kayvi Solar Logo",
    width: 700,
    height: 608,
    markWidth: 674,
    markHeight: 374,
  },
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 8200498266",
  email: process.env.NEXT_PUBLIC_EMAIL || "kayvisolar@gmail.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "Shop No. 12, R. D. Complex, Navagam, Dindoli Rd, Udhana, Surat, Gujarat 394210",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918200498266",
  leadWebhookUrl: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || "https://api.kayvisolar.com/api/v1/leads",
  socialLinks: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com",
  }
};

export type SiteConfig = typeof siteConfig;
