"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceDetailClient({
  title,
  subtitle,
  imageSrc,
  locale,
  ctaText
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  locale: string;
  ctaText: string;
}) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={imageSrc} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <motion.div className="relative z-10 text-center space-y-6 max-w-3xl px-4" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">{title}</h1>
          <p className="text-xl text-gray-200">{subtitle}</p>
          <Link 
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {ctaText}
          </Link>
        </motion.div>
      </section>

      <section className="py-24 px-4 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-lg">25</div>
                <h3 className="font-bold text-lg mb-2">{locale === 'hi' ? '25 वर्ष वारंटी' : locale === 'gu' ? '25 વર્ષ વોરંટી' : '25-Yr Warranty'}</h3>
                <p className="text-muted-foreground text-sm">{locale === 'hi' ? 'दीर्घकालिक गारंटीकृत प्रदर्शन के साथ टियर-1 सोलर उपकरण।' : locale === 'gu' ? 'લાંબા ગાળાની ગેરંટીકૃત કામગીરી સાથે ટાયર-1 સોલાર સાધનો.' : 'Tier-1 solar equipment with long-term guaranteed performance.'}</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-lg">₹</div>
                <h3 className="font-bold text-lg mb-2">{locale === 'hi' ? 'सब्सिडी और नेट मीटरिंग' : locale === 'gu' ? 'સબસિડી અને નેટ મીટરિંગ' : 'Subsidy & Net Metering'}</h3>
                <p className="text-muted-foreground text-sm">{locale === 'hi' ? 'संपूर्ण पीएम सूर्य घर आवेदन और डिस्कॉम समन्वय सहायता।' : locale === 'gu' ? 'સંપૂર્ણ પીએમ સૂર્ય ઘર અરજી અને ડિસ્કોમ સંકલન સહાય.' : 'Complete PM Surya Ghar application and DISCOM liaison.'}</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-lg">48h</div>
                <h3 className="font-bold text-lg mb-2">{locale === 'hi' ? 'त्वरित साइट सर्वेक्षण' : locale === 'gu' ? 'ઝડપી સાઇટ સર્વે' : 'Quick Site Survey'}</h3>
                <p className="text-muted-foreground text-sm">{locale === 'hi' ? 'मुफ्त रूफटॉप लेआउट मूल्यांकन और अनुकूलित पेबैक अनुमान।' : locale === 'gu' ? 'મફત રૂફટોપ લેઆઉટ મૂલ્યાંકન અને પેબેક અંદાજ.' : 'Free rooftop layout assessment and customized payback estimate.'}</p>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                {locale === 'hi' ? 'मुफ्त साइट विजिट शेड्यूल करें' : locale === 'gu' ? 'મફત સાઇટ મુલાકાત શેડ્યૂલ કરો' : 'Schedule Free Site Visit'}
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
