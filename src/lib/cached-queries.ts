import { cache } from 'react';
import prisma from './prisma';

/**
 * Cached site settings fetcher.
 * React.cache() deduplicates calls within a single server request,
 * so multiple components calling this in the same render cycle
 * will only hit the database once.
 */
export const getSiteSettings = cache(async (): Promise<Record<string, string>> => {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach(s => map[s.key] = s.value);
  return map;
});
