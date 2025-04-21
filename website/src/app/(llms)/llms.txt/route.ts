import { frameworks } from '~/lib/frameworks'
import { categories, getSidebarGroups } from '~/lib/sidebar'

export const dynamic = 'force-static'

export const GET = async () => {
  const sidebarGroups = getSidebarGroups()

  const generateUrl = (framework: string, slug: string) => `https://ark-ui.com/${framework}/docs/${slug}`

  const generatePageLinks = (page: { title: string; slug: string }) =>
    frameworks.map((framework) => `- [${page.title}](${generateUrl(framework, page.slug)})`).join('\n')

  const generateCategorySection = (category: string, pages: (typeof sidebarGroups)[number]) => {
    const header = `# ${category.toUpperCase()}\n`
    const pageLinks = pages.map(generatePageLinks).join('\n')
    return `${header}\n${pageLinks}`
  }

  const content = categories
    .map((category, index) => generateCategorySection(category, sidebarGroups[index]))
    .join('\n\n')

  return new Response(content)
}
