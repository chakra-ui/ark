'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import type { SidebarItem } from '~/lib/sidebar'
import { recipe } from '../sidebar.recipe'

const styles = recipe()

interface Props {
  groups: SidebarItem[][]
}

const labelMap = new Map<string, string>([['ai', 'AI for agents']])
const getLabel = (category: string) => labelMap.get(category) || category

export const DocsSidebar = (props: Props) => {
  const { groups } = props
  const pathname = usePathname()

  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group, id) => {
          const uniqueGroup = uniqueByTitle(group)
          return (
            <li key={id} className={styles.group}>
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className={styles.trigger}>
                  <span> {getLabel(group[0].category)}</span>
                  <Icon size="sm" className={styles.indicator}>
                    <ChevronRightIcon />
                  </Icon>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <ul>
                    {uniqueGroup.map((item) => {
                      const href = `/docs/${item.slug}`
                      return (
                        <li key={item.id}>
                          <NextLink
                            href={href}
                            aria-current={pathname === href ? 'page' : undefined}
                            className={styles.link}
                          >
                            {item.title}
                            {item.status && (
                              <Badge
                                textTransform="capitalize"
                                size="sm"
                                data-status={item.status}
                                css={{
                                  '&[data-status=new]': {
                                    bg: 'colorPalette.default',
                                    color: 'colorPalette.fg',
                                    borderColor: 'transparent',
                                  },
                                }}
                              >
                                {item.status}
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
        })}
      </ul>
    </nav>
  )
}

const uniqueByTitle = (items: SidebarItem[]): SidebarItem[] =>
  Array.from(new Map(items.map((item) => [item.title, item])).values())
