"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/config/site';
import Logo from '@/components/common/Logo';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Layout.footer');
  const navT = useTranslations('Navigation');

  return (
    <footer className="bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <Logo variant="dark" height={52} />
            </Link>
            <p className="text-zinc-400 text-sm">
              {t('tagline')}
            </p>
            <div className="space-y-2 text-xs text-zinc-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-emerald-400 transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
            <div className="flex space-x-4 pt-2 text-sm">
              <a href="#" className="hover:text-emerald-500 transition-colors">Facebook</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Twitter</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Instagram</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/about`} className="hover:text-emerald-500 transition-colors">{navT('about')}</Link></li>
              <li><Link href={`/${locale}/calculator`} className="hover:text-emerald-500 transition-colors">{navT('calculator')}</Link></li>
              <li><Link href={`/${locale}/gallery`} className="hover:text-emerald-500 transition-colors">{navT('gallery')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-emerald-500 transition-colors">{navT('contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">{t('services')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/services/residential-solar`} className="hover:text-emerald-500 transition-colors">{navT('residential')}</Link></li>
              <li><Link href={`/${locale}/services/commercial-solar`} className="hover:text-emerald-500 transition-colors">{navT('commercial')}</Link></li>
              <li><Link href={`/${locale}/services/solar-water-heater`} className="hover:text-emerald-500 transition-colors">{navT('waterHeater')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">{t('newsletter')}</h4>
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder={t('emailPlaceholder')} 
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-500"
              />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>{t('builtBy')}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-500">{t('privacy')}</a>
            <a href="#" className="hover:text-emerald-500">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
