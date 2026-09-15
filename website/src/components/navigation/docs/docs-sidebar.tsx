'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Badge } from '~/components/ui/badge'
import { getActiveTab } from '~/lib/active-tab'
import type { SidebarTab } from '~/lib/sidebar'
import { recipe } from '../sidebar.recipe'

const styles = recipe()

interface Props {
  tabs: SidebarTab[]
}

export const DocsSidebar = (props: Props) => {
  const { tabs } = props
  const pathname = usePathname()
  const currentRef = useRef<HTMLAnchorElement>(null)
  const groups = getActiveTab(pathname, tabs)?.groups ?? []

  // On load the sidebar starts at the top, so a page low in the list is scrolled out of sight.
  // `nearest` brings it in without moving anything when it is already visible.
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest' })
  }, [])

  return (
    <nav>
      <div className={styles.root}>
        {groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <p className={styles.label}>{group.title}</p>
            <ul className={styles.list}>
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
          </div>
        ))}
      </div>
    </nav>
  )
}
