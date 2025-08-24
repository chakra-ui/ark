import { SparklesIcon } from 'lucide-react'

interface NavLinkItem {
  label: string
  href: string
  hrefPrefix: string
  icon?: React.ElementType
}

export const navLinks: NavLinkItem[] = [
  {
    label: 'Docs',
    href: '/docs/overview/introduction',
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
