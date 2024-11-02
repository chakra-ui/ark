import type { MetadataRoute } from 'next'
import { fetchExamples } from '~/lib/examples'
import { getSidebarGroups } from '~/lib/sidebar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const frameworks = ['react', 'solid', 'vue']

  const docsPages = frameworks.flatMap((framework) =>
    getSidebarGroups()
      .flat()
      .map((page) => ({ url: `https://ark-ui.com/${framework}/docs/${page.slug}` })),
  )

  const examples = await fetchExamples()
  const examplePages = frameworks.flatMap((framework) =>
    examples.map((example) => ({ url: `https://ark-ui.com/${framework}/examples/${example.id}` })),
  )

  return [{ url: 'https://ark-ui.com' }, ...docsPages, ...examplePages]
}
