import { cleanupPageContent } from '~/app/(llms)/shared'
import { frameworks } from '~/lib/frameworks'
import { getSidebarGroupsWithPages } from '~/lib/sidebar'
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

const generateCategorySection = async (group: { title: string; items: Pages[] }) => {
  const header = `# ${group.title.toUpperCase()}\n\n---\n`
  const pagesContent = await Promise.all(group.items.map(generatePageContent))
  return `${header}\n${pagesContent.join('\n')}`
}

export const GET = async () => {
  const sidebarGroups = getSidebarGroupsWithPages()
  const content = await Promise.all(sidebarGroups.map(generateCategorySection)).then((sections) =>
    sections.join('\n\n'),
  )

  return new Response(content)
}
