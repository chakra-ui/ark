import type { SidebarTab } from './sidebar'

export const frameworks = ['react', 'solid', 'vue', 'svelte', 'web'] as const
export type Framework = (typeof frameworks)[number]
export const defaultFramework: Framework = 'react'

export const frameworkLabels: Record<Framework, string> = {
  react: 'React',
  solid: 'Solid',
  vue: 'Vue',
  svelte: 'Svelte',
  web: 'Web Components',
}

export const isFramework = (value: string | undefined): value is Framework => frameworks.includes(value as Framework)

export const hasPlusExamples = (framework: Framework) => framework !== 'web'

const unavailableDocs: Partial<Record<Framework, string[]>> = {
  web: [
    'overview/changelog',
    'utilities/client-only',
    'utilities/environment',
    'utilities/focus-trap',
    'utilities/frame',
    'utilities/json-tree-view',
    'utilities/locale',
    'utilities/presence',
  ],
}

export const isDocAvailable = (framework: Framework, slug: string) => !unavailableDocs[framework]?.includes(slug)

export const filterSidebarTabs = (tabs: SidebarTab[], framework: Framework): SidebarTab[] =>
  tabs.flatMap((tab) => {
    const groups = tab.groups
      .map((group) => ({ ...group, items: group.items.filter((item) => isDocAvailable(framework, item.slug)) }))
      .filter((group) => group.items.length > 0)
    return groups.length > 0 ? [{ ...tab, groups, landingSlug: groups[0].items[0].slug }] : []
  })

export const extractFramework = (segments: string[]): { framework: Framework; slug: string[] } => {
  const [first, ...rest] = segments
  if (isFramework(first)) return { framework: first, slug: rest }
  return { framework: defaultFramework, slug: segments }
}

export const docsHref = (framework: Framework, slug: string) => `/docs/${framework}/${slug}`
export const examplesHref = (framework: Framework, id: string) => `/examples/${framework}/${id}`

export const frameworkFromPathname = (pathname: string): Framework => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] === 'docs' || segments[0] === 'examples'
    ? extractFramework(segments.slice(1)).framework
    : defaultFramework
}
