"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  projectType: z.string().min(1, { message: 'Please select a project type.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactClient() {
  const t = useTranslations('ContactPage');
  const navT = useTranslations('Navigation');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Wire up to FastAPI Leads endpoint in Phase 5
    setIsSubmitted(true);
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const addressLabel = locale === 'hi' ? 'पता' : locale === 'gu' ? 'સરનામું' : 'Address';
  const phoneLabel = locale === 'hi' ? 'फ़ोन नंबर' : locale === 'gu' ? 'ફોન નંબર' : 'Phone';
  const emailLabel = locale === 'hi' ? 'ईमेल' : locale === 'gu' ? 'ઈમેલ' : 'Email';

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-emerald-600 text-white py-24 px-4 text-center">
        <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-emerald-100">{t('hero.subtitle')}</p>
        </motion.div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div className="space-y-12" {...fadeIn}>
            <div>
              <h2 className="text-3xl font-bold mb-8 text-emerald-600">{t('info.title')}</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950/50 p-3 rounded-full text-emerald-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{addressLabel}</h4>
                    <p className="text-muted-foreground leading-relaxed">{t('info.address')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950/50 p-3 rounded-full text-emerald-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{phoneLabel}</h4>
                    <a href={`tel:${t('info.phone').replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-emerald-600 transition-colors">
                      {t('info.phone')}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950/50 p-3 rounded-full text-emerald-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{emailLabel}</h4>
                    <a href={`mailto:${t('info.email')}`} className="text-muted-foreground hover:text-emerald-600 transition-colors">
                      {t('info.email')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-zinc-800">
              <iframe 
                title="Kayvi Solar Location Map"
                src="https://maps.google.com/maps?q=Shop+No.+12,+R.+D.+Complex,+Navagam,+Dindoli+Rd,+Udhana,+Surat,+Gujarat+394210&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800" {...fadeIn} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-8">{t('form.title')}</h2>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                <CheckCircle2 className="w-20 h-20 text-emerald-500" />
                <h3 className="text-2xl font-bold text-emerald-600">{t('form.success')}</h3>
                <p className="text-muted-foreground">We will get back to you shortly.</p>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    reset();
                  }} 
                  variant="outline" 
                  className="mt-4"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name')}</Label>
                  <Input id="name" placeholder={t('form.namePlaceholder')} {...register('name')} className="bg-gray-50 dark:bg-zinc-950" />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message as string}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('form.email')}</Label>
                    <Input id="email" type="email" placeholder={t('form.emailPlaceholder')} {...register('email')} className="bg-gray-50 dark:bg-zinc-950" />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('form.phone')}</Label>
                    <Input id="phone" type="tel" placeholder={t('form.phonePlaceholder')} {...register('phone')} className="bg-gray-50 dark:bg-zinc-950" />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message as string}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">{t('form.projectType')}</Label>
                  <select 
                    id="projectType"
                    className="flex h-10 w-full rounded-md border border-input bg-gray-50 dark:bg-zinc-950 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('projectType')}
                  >
                    <option value="">{t('form.projectPlaceholder')}</option>
                    <option value="residential">{navT('residential')}</option>
                    <option value="commercial">{navT('commercial')}</option>
                    <option value="waterHeater">{navT('waterHeater')}</option>
                  </select>
                  {errors.projectType && <p className="text-sm text-red-500">{errors.projectType.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('form.message')}</Label>
                  <textarea 
                    id="message"
                    placeholder={t('form.messagePlaceholder')} 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-gray-50 dark:bg-zinc-950 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('message')} 
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message.message as string}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  {t('form.submit')}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
