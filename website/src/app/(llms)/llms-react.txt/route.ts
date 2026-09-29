import { cacheLife } from 'next/cache'
import { cleanupPageContent } from '~/lib/llm-content'
import type { PageMeta } from '~/lib/source'
import { getSidebarGroupsWithPages } from '~/lib/sidebar'

const generatePageContent = async (page: PageMeta) =>
  `# ${page.title}\n\n${await cleanupPageContent(page, 'react')}\n\n`

const generateCategorySection = async (group: { title: string; items: PageMeta[] }) => {
  const header = `# ${group.title.toUpperCase()}\n\n---\n`
  const pagesContent = await Promise.all(group.items.map(generatePageContent))
  return `${header}\n${pagesContent.join('\n')}`
}

const getContent = async () => {
  'use cache'
  cacheLife('max')
  const sidebarGroups = getSidebarGroupsWithPages()
  const sections = await Promise.all(sidebarGroups.map(generateCategorySection))
  return sections.join('\n\n')
}

export const GET = async () => new Response(await getContent())
