import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import "../globals.css";
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: siteConfig.businessName,
  description: siteConfig.tagline,
  icons: {
    icon: '/favicon.ico',
    apple: siteConfig.logo.mark,
  },
  openGraph: {
    title: siteConfig.businessName,
    description: siteConfig.tagline,
    images: [
      {
        url: siteConfig.logo.src,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
        alt: siteConfig.logo.alt,
      },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${process.env.NEXT_PUBLIC_COLOR_PRIMARY || "16 185 129"};
            --secondary: ${process.env.NEXT_PUBLIC_COLOR_SECONDARY || "234 179 8"};
            --accent: ${process.env.NEXT_PUBLIC_COLOR_ACCENT || "14 165 233"};
          }
        `}} />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header locale={locale} />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
