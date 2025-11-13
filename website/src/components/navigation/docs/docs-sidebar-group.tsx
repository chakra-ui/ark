'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import { recipe } from '../sidebar.recipe'
import { Icon } from '~/components/ui/icon'
import { Badge } from '~/components/ui/badge'

const styles = recipe()

const labelMap = new Map<string, string>([['ai', 'AI for agents']])
const getLabel = (category: string) => labelMap.get(category) || category

interface Props {
  category: string
  links: {
    id: string
    title: string
    slug: string
    status?: string
  }[]
}

export const DocsSidebarGroup = (props: Props) => {
  const { category, links } = props
  const pathname = usePathname()

  return (
    <li className={styles.group}>
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger className={styles.trigger}>
          <span> {getLabel(category)}</span>
          <Icon size="sm" className={styles.indicator}>
            <ChevronRightIcon />
          </Icon>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <ul>
            {links.map((link) => {
              const href = `/docs/${link.slug}`
              return (
                <li key={link.id}>
                  <NextLink href={href} aria-current={pathname === href ? 'page' : undefined} className={styles.link}>
                    {link.title}
                    {link.status && (
                      <Badge
                        textTransform="capitalize"
                        size="sm"
                        data-status={link.status}
                        css={{
                          '&[data-status=new]': {
                            bg: 'colorPalette.default',
                            color: 'colorPalette.fg',
                            borderColor: 'transparent',
                          },
                        }}
                      >
                        {link.status}
                      </Badge>
                    )}
                  </NextLink>
                </li>
              )
            })}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  )
}
