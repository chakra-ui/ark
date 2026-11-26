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

const unavailableDocs: Partial<Record<Framework, string[]>> = {
  web: ['overview/changelog', 'utilities/client-only', 'utilities/environment', 'utilities/presence'],
}

export const isDocAvailable = (framework: Framework, slug: string) => !unavailableDocs[framework]?.includes(slug)

export const filterSidebarTabs = (tabs: SidebarTab[], framework: Framework): SidebarTab[] =>
  tabs.flatMap((tab) => {
    const groups = tab.groups
      .map((group) => ({ ...group, items: group.items.filter((item) => isDocAvailable(framework, item.slug)) }))
      .filter((group) => group.items.length > 0)
    if (groups.length === 0) return []
    const landingSlug = groups.find((group) => group.link)?.link?.slug ?? groups[0].items[0].slug
    return [{ ...tab, groups, landingSlug }]
  })

export const extractFramework = (segments: string[]): { framework: Framework; slug: string[] } => {
  const [first, ...rest] = segments
  if (isFramework(first)) return { framework: first, slug: rest }
  return { framework: defaultFramework, slug: segments }
}

export const docsHref = (framework: Framework, slug: string) => `/docs/${framework}/${slug}`

export const frameworkFromPathname = (pathname: string): Framework => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] === 'docs' ? extractFramework(segments.slice(1)).framework : defaultFramework
}
