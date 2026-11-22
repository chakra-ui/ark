import { docsHref, extractFramework, frameworkFromPathname } from './frameworks'

interface NavLinkItem {
  label: string
  href: string
  docsSlug?: string
  isActive: (pathname: string) => boolean
  icon?: React.ElementType
}

const isComponentsPath = (pathname: string) => {
  const [base, ...rest] = pathname.split('/').filter(Boolean)
  return base === 'docs' && ['components', 'guides'].includes(extractFramework(rest).slug[0] ?? '')
}

export const navLinks: NavLinkItem[] = [
  {
    label: 'Docs',
    href: '/docs/react/overview/getting-started',
    docsSlug: 'overview/getting-started',
    isActive: (pathname) => pathname.startsWith('/docs') && !isComponentsPath(pathname),
  },
  {
    label: 'Components',
    href: '/docs/react/components/overview',
    docsSlug: 'components/overview',
    isActive: isComponentsPath,
  },
  {
    label: 'Showcase',
    href: '/showcase',
    isActive: (pathname) => pathname.startsWith('/showcase'),
  },
  {
    label: 'Blog',
    href: '/blog',
    isActive: (pathname) => pathname.startsWith('/blog'),
  },
]

export const resolveNavHref = (link: NavLinkItem, pathname: string) =>
  link.docsSlug ? docsHref(frameworkFromPathname(pathname), link.docsSlug) : link.href
