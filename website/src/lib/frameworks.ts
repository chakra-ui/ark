export const frameworks = ['react', 'solid', 'vue', 'svelte'] as const
export type Framework = (typeof frameworks)[number]
export const defaultFramework: Framework = 'react'

export const isFramework = (value: string | undefined): value is Framework => frameworks.includes(value as Framework)

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
