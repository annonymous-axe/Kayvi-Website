"use client";

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/calculator`, label: t('calculator') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const getLocalizedPath = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const cleanPath = pathname.replace(/\/$/, '');
    if (cleanPath === '' || cleanPath === `/${locale}`) {
      return `/${targetLocale}`;
    }
    if (cleanPath.startsWith(`/${locale}/`)) {
      return cleanPath.replace(`/${locale}/`, `/${targetLocale}/`);
    }
    return `/${targetLocale}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="font-extrabold text-xl md:text-2xl text-emerald-600 tracking-tight">
              {siteConfig.businessName}
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-emerald-600 ${
                  pathname.startsWith(link.href) ? 'text-emerald-600 font-semibold' : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Desktop Language Switcher */}
          <div className="flex items-center space-x-1 text-xs font-semibold bg-gray-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-gray-200/50 dark:border-zinc-700/50">
            {[
              { code: 'en', label: 'EN', title: 'English' },
              { code: 'hi', label: 'हिं', title: 'हिंदी' },
              { code: 'gu', label: 'ગુજ', title: 'ગુજરાતી' },
            ].map((lang) => {
              const targetPath = getLocalizedPath(lang.code);
              const isActive = locale === lang.code;
              return (
                <Link
                  key={lang.code}
                  href={targetPath}
                  title={lang.title}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    isActive
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-muted-foreground hover:text-emerald-600'
                  }`}
                >
                  {lang.label}
                </Link>
              );
            })}
          </div>
          
          <Button 
            className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-700"
            render={<Link href={`/${locale}/calculator`} />}
            nativeButton={false}
          >
             {t('calculator')}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="flex flex-col gap-3 mt-4 border-t pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Language / भाषा / ભાષા</span>
                  <div className="flex gap-2">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'hi', label: 'हिंदी' },
                      { code: 'gu', label: 'ગુજરાતી' },
                    ].map((lang) => {
                      const targetPath = getLocalizedPath(lang.code);
                      const isActive = locale === lang.code;
                      return (
                        <Link
                          key={lang.code}
                          href={targetPath}
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                            isActive
                              ? 'bg-emerald-600 text-white shadow-sm font-bold'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          {lang.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
