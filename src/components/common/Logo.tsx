import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export interface LogoProps {
  /**
   * 'light' for light backgrounds (default, navy & orange logo)
   * 'dark' for dark backgrounds (footer, white & orange logo)
   * 'mark' for icon-only (house & sun emblem)
   */
  variant?: 'light' | 'dark' | 'mark';
  /**
   * Rendered height of the logo in pixels. Default is 48px.
   */
  height?: number;
  /**
   * Prioritize loading for above-the-fold display (e.g. Header)
   */
  priority?: boolean;
  /**
   * Additional classes for container wrapper
   */
  className?: string;
  /**
   * Additional classes directly on the Next.js <Image />
   */
  imgClassName?: string;
}

/**
 * Centralized Logo component for Kayvi Solar.
 * Reads directly from `siteConfig.logo`.
 * Changing the logo in siteConfig or replacing the image files in `public/images/`
 * automatically updates the logo across all pages, Header, Footer, and modals.
 */
export default function Logo({
  variant = 'light',
  height = 48,
  priority = false,
  className = '',
  imgClassName = '',
}: LogoProps) {
  const isDark = variant === 'dark';
  const isMark = variant === 'mark';

  const src = isMark
    ? siteConfig.logo.mark
    : isDark
      ? (siteConfig.logo.srcDark || siteConfig.logo.src)
      : siteConfig.logo.src;

  const aspectRatio = isMark
    ? (siteConfig.logo.markWidth || 674) / (siteConfig.logo.markHeight || 374)
    : siteConfig.logo.width / siteConfig.logo.height;

  const width = Math.round(height * aspectRatio);

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt={siteConfig.logo.alt}
        width={width}
        height={height}
        priority={priority}
        className={`object-contain transition-transform duration-200 hover:scale-[1.02] ${imgClassName}`}
        style={{
          height: `${height}px`,
          width: 'auto',
          aspectRatio: `${width} / ${height}`,
        }}
      />
    </div>
  );
}
