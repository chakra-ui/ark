import type { MetadataRoute } from 'next'
import { fetchExamples } from '~/lib/examples'
import { getSidebarGroups } from '~/lib/sidebar'

export const frameworks = ['react', 'solid', 'vue'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docsPages = frameworks.flatMap((framework) =>
    getSidebarGroups()
      .flat()
      .map((page) => ({ url: `https://ark-ui.com/${framework}/docs/${page.slug}` })),
  )

  const examples = await fetchExamples()
  const examplePages = frameworks.flatMap((framework) =>
    examples.map((example) => ({ url: `https://ark-ui.com/${framework}/examples/${example}` })),
  )

  return [{ url: 'https://ark-ui.com' }, ...docsPages, ...examplePages]
}
