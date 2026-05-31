import { getBaseUrl } from '@/utils/helpers';
import type { MetadataRoute } from 'next';

const HOME_PAGE_SITEMAP_PRIORITY = 0.7;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: HOME_PAGE_SITEMAP_PRIORITY,
    },
  ];
}
