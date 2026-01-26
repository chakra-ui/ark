import { frameworks } from '~/lib/frameworks'
import { getSidebarGroups } from '~/lib/sidebar'

export const dynamic = 'force-static'

export const GET = async () => {
  const sidebarGroups = getSidebarGroups()

  const generateUrl = (framework: string, slug: string) => `https://ark-ui.com/${framework}/docs/${slug}`

  const generatePageLinks = (page: { title: string; slug: string }) =>
    frameworks.map((framework) => `- [${page.title}](${generateUrl(framework, page.slug)})`).join('\n')

  const generateCategorySection = (group: (typeof sidebarGroups)[number]) => {
    const header = `# ${group.title.toUpperCase()}\n`
    const pageLinks = group.items.map(generatePageLinks).join('\n')
    return `${header}\n${pageLinks}`
  }

  const content = sidebarGroups.map(generateCategorySection).join('\n\n')

  return new Response(content)
}
