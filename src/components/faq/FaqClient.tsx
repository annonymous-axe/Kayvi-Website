"use client";

import React from 'react';
import FaqSection from '@/components/faq/FaqSection';
import { Faq } from '@/lib/staticData';

interface FaqClientProps {
  faqs?: Faq[];
  locale?: string;
}

export default function FaqClient({ locale = 'en' }: FaqClientProps) {
  return (
    <div className="flex flex-col min-h-screen pt-12">
      <FaqSection locale={locale} showCategories={true} />
    </div>
  );
}
