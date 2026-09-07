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
  { id: 'experience', value: 10, suffix: '+', translationKey: 'stats.experience' },
  { id: 'installations', value: 500, suffix: '+', translationKey: 'stats.installations' },
  { id: 'mwGenerated', value: 20, suffix: 'MW+', translationKey: 'stats.mwGenerated' },
  { id: 'support', value: 24, suffix: '/7', translationKey: 'stats.support' },
];
