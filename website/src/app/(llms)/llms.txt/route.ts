import { frameworks } from '~/lib/frameworks'
import { getSidebarGroups } from '~/lib/sidebar'

export const dynamic = 'force-static'

const LABELS: Record<string, string> = { react: 'React', solid: 'Solid', vue: 'Vue', svelte: 'Svelte' }

const SUMMARY =
  'Ark UI is a headless component library for building design systems. It ships the same accessible, unstyled components for React, Solid, Svelte, and Vue, built on Zag.js state machines.'

export const GET = async () => {
  const pageUrl = (framework: string, slug: string) => `https://ark-ui.com/${framework}/docs/${slug}`

  // one H1, first line, then H2 sections (see https://llmstxt.org)
  const intro = [
    '# Ark UI',
    '',
    `> ${SUMMARY}`,
    '',
    'Every page exists once per framework. Links are prefixed with the framework they document.',
    '',
    '## Full documentation',
    '',
    ...frameworks.map(
      (f) => `- [llms-${f}.txt](https://ark-ui.com/llms-${f}.txt): All ${LABELS[f]} documentation in one file`,
    ),
    '',
    '- A single page as markdown: `https://ark-ui.com/llms.txt/{slug}`, for example [components/accordion](https://ark-ui.com/llms.txt/components/accordion). Add `?framework=vue` to switch framework.',
  ].join('\n')

  const section = (group: ReturnType<typeof getSidebarGroups>[number]) => {
    const links = group.items.flatMap((page) =>
      frameworks.map((f) => `- [${LABELS[f]}: ${page.title}](${pageUrl(f, page.slug)})`),
    )
    return `## ${group.title}\n\n${links.join('\n')}`
  }

  const content = [intro, ...getSidebarGroups().map(section)].join('\n\n')

  return new Response(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
