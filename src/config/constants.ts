// Centralized constants for the website
// Use this file as the single source of truth for assets, config values, and placeholders.

export const SITE_IMAGES = {
  hero: '/images/hero_bg.jpg',
  services: {
    residential: '/images/residential_solar.jpg',
    commercial: '/images/commercial_solar.jpg',
    waterHeater: '/images/solar_water_heater.jpg',
  }
};

export const SITE_STATS = [
  { id: 'warranty', value: 25, suffix: 'Yr', translationKey: 'stats.warranty' },
  { id: 'savings', value: 80, suffix: '%+', translationKey: 'stats.savings' },
  { id: 'subsidy', value: 100, suffix: '%', translationKey: 'stats.subsidy' },
  { id: 'survey', value: 48, suffix: 'h', translationKey: 'stats.survey' },
];
