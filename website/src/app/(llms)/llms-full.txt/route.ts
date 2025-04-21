import { cleanupPageContent } from '~/app/(llms)/shared'
import { frameworks } from '~/lib/frameworks'
import { categories, getSidebarGroups } from '~/lib/sidebar'
import type { Pages } from '.velite'

export const dynamic = 'force-static'

const generatePageContent = async (page: Pages) =>
  (
    await Promise.all(
      frameworks.map(async (framework) => {
        return `# ${page.title} (${framework.toUpperCase()})\n\n${await cleanupPageContent(page, framework)}\n\n`
      }),
    )
  ).join('\n')

const generateCategorySection = async (category: string, pages: Pages[]) => {
  const header = `# ${category.toUpperCase()}\n\n---\n`
  const pagesContent = await Promise.all(pages.map(generatePageContent))
  return `${header}\n${pagesContent.join('\n')}`
}

export const GET = async () => {
  const sidebarGroups = getSidebarGroups()
  const content = await Promise.all(
    categories.map((category, index) => generateCategorySection(category, sidebarGroups[index])),
  ).then((sections) => sections.join('\n\n'))

  return new Response(content)
}
