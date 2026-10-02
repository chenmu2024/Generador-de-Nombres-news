import type { MetadataRoute } from 'next';
import { keywordPages } from '@/data/keywordMaster';
import {indexableStaticRoutes} from '@/data/siteNavigation';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://generadordenombres.net';

  const keywordRoutes: MetadataRoute.Sitemap = keywordPages
    .filter((item) => item.indexable && item.status === 'VERIFIED')
    .map((item) => ({
      url: item.path === '/' ? base + '/' : base + item.path,
      changeFrequency: item.path === '/' ? 'daily' : 'weekly',
      priority: item.path === '/' ? 1 : 0.8,
    }));

  const staticRoutes: MetadataRoute.Sitemap = indexableStaticRoutes.map((path) => ({
    url: base + path,
    changeFrequency: 'monthly',
    priority: 0.3,
  }));

  return [...keywordRoutes, ...staticRoutes];
}
