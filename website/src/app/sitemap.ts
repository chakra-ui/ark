import type { MetadataRoute } from 'next'
import { fetchExamples } from '~/lib/examples'
import { getSidebarGroups } from '~/lib/sidebar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docsPages = getSidebarGroups()
    .flat()
    .map((page) => ({ url: `https://ark-ui.com/docs/${page.slugs.join('/')}` }))

  const examples = await fetchExamples()
  const examplePages = examples.map((example) => ({ url: `https://ark-ui.com/examples/${example}` }))

  return [{ url: 'https://ark-ui.com' }, ...docsPages, ...examplePages]
}
