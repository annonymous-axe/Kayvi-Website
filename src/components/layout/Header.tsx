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
          <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold">
            {(['en', 'hi', 'gu'] as const).map((l) => {
              const targetPath = pathname ? pathname.replace(/^\/(en|hi|gu)/, `/${l}`) : `/${l}`;
              const isActive = locale === l;
              return (
                <Link
                  key={l}
                  href={targetPath}
                  className={`px-2 py-1 rounded transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 font-bold dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'text-muted-foreground hover:text-emerald-600 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {l.toUpperCase()}
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
                <div className="flex gap-4 mt-4 border-t pt-4">
                  <span className="text-sm font-bold text-emerald-600">EN</span>
                  <span className="text-sm text-muted-foreground line-through">HI</span>
                  <span className="text-sm text-muted-foreground line-through">GU</span>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
