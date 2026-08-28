'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import type { SidebarGroup } from '~/lib/sidebar'
import { recipe } from '../sidebar.recipe'

const styles = recipe()

interface Props {
  groups: SidebarGroup[]
}

export const DocsSidebar = (props: Props) => {
  const { groups } = props
  const pathname = usePathname()
  const currentRef = useRef<HTMLAnchorElement>(null)

  // On load the sidebar starts at the top, so a page low in the list is scrolled out of sight.
  // `nearest` brings it in without moving anything when it is already visible.
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest' })
  }, [])

  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group) => (
          <li key={group.title} className={styles.group}>
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger className={styles.trigger}>
                <span>{group.title}</span>
                <Icon size="sm" className={styles.indicator}>
                  <ChevronRightIcon />
                </Icon>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <ul>
                  {group.items.map((item) => {
                    const href = `/docs/${item.slug}`
                    const isCurrent = pathname === href
                    return (
                      <li key={item.id}>
                        <NextLink
                          ref={isCurrent ? currentRef : undefined}
                          href={href}
                          aria-current={isCurrent ? 'page' : undefined}
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
        ))}
      </ul>
    </nav>
  )
}
