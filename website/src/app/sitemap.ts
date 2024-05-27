import type { MetadataRoute } from 'next'
import { getSidebarGroups } from '~/lib/sidebar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docsPages = ['react', 'solid', 'vue'].flatMap((framework) =>
    getSidebarGroups()
      .flatMap((group) => group)
      .map((page) => ({ url: `https://ark-ui.com/${framework}/docs/${page.slug}` })),
  )

  const showcasePages = ['react', 'solid', 'vue'].map((framework) => ({
    url: `https://ark-ui.com/${framework}/showcase`,
  }))

  return [{ url: 'https://ark-ui.com' }, ...docsPages, ...showcasePages]
}
