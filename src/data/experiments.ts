export const EXPERIMENTS={
  homeHero:'home-entry-v1',
  homePopular:'home-popular-v1',
  homeResume:'home-resume-v1',
  homeQuick:'home-quick-v1',
  nextStep:'next-intent-v1',
  related:'related-links-v1',
  emptyFavorites:'favorites-empty-v1',
  nav:'nav-core-v1',
  favoritesNav:'favorites-nav-v1',
  searchRoute:'search-route-v1',
  productActions:'product-actions-v1',
  sessionDepth:'session-depth-v1',
  webVitals:'web-vitals-v1',
  footerNav:'footer-nav-v1',
  alphabetNav:'alphabet-nav-v1',
  pageView:'page-view-v1',
} as const;

export type ExperimentId=(typeof EXPERIMENTS)[keyof typeof EXPERIMENTS];
