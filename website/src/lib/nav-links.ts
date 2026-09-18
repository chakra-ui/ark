import { SparklesIcon } from 'lucide-react'
import { docsHref, frameworkFromPathname } from './frameworks'

interface NavLinkItem {
  label: string
  href: string
  hrefPrefix: string
  icon?: React.ElementType
}

export const navLinks: NavLinkItem[] = [
  {
    label: 'Docs',
    href: '/docs/react/overview/getting-started',
    hrefPrefix: '/docs',
  },
  {
    label: 'Showcase',
    href: '/showcase',
    hrefPrefix: '/showcase',
  },
  {
    label: 'Blog',
    href: '/blog',
    hrefPrefix: '/blog',
  },
  {
    label: 'Plus',
    href: '/plus',
    hrefPrefix: '/plus',
    icon: SparklesIcon,
  },
]

export const resolveNavHref = (link: NavLinkItem, pathname: string) =>
  link.hrefPrefix === '/docs' ? docsHref(frameworkFromPathname(pathname), 'overview/getting-started') : link.href
