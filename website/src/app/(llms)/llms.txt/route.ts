import { frameworkLabels as LABELS, frameworks, isDocAvailable } from '~/lib/frameworks'
import { getSidebarGroups } from '~/lib/sidebar'

const SUMMARY =
  'Ark UI is a headless component library for building design systems. It ships the same accessible, unstyled components for React, Solid, Svelte, Vue, and Web Components, built on Zag.js state machines.'

export const GET = async () => {
  const pageUrl = (framework: string, slug: string) => `https://ark-ui.com/docs/${framework}/${slug}.md`

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
    '- Any docs page as markdown: add `.md` to its URL, for example [docs/vue/components/accordion.md](https://ark-ui.com/docs/vue/components/accordion.md).',
  ].join('\n')

  const section = (group: ReturnType<typeof getSidebarGroups>[number]) => {
    const links = group.items.flatMap((page) =>
      frameworks
        .filter((f) => isDocAvailable(f, page.slug))
        .map((f) => `- [${LABELS[f]}: ${page.title}](${pageUrl(f, page.slug)})`),
    )
    return `## ${group.title}\n\n${links.join('\n')}`
  }

  const content = [intro, ...getSidebarGroups().map(section)].join('\n\n')

  return new Response(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
