import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: 'https://ark-ui.com' },
    // TODO add all the examples
    // { url: 'https://ark-ui.com/examples' },
    // ...Object.keys(categories).map((categoryId) => ({
    //   url: `https://park-ui.com/examples/${categoryId}`,
    // })),
    // ...urls,
  ]
}
