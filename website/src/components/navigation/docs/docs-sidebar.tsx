'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { recipe } from '../sidebar.recipe'
import type { Pages } from '.velite'

const styles = recipe()

interface Props {
  groups: Pages[][]
}

export const DocsSidebar = (props: Props) => {
  const { groups } = props
  const pathname = usePathname()
  const params = useParams<{ framework: string }>()

  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group, id) => {
          const uniqueGroup = uniqueByTitle(group)
          return (
            <li key={id} className={styles.group}>
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className={styles.trigger}>
                  <span> {group[0].category}</span>
                  <Icon size="sm" className={styles.indicator}>
                    <ChevronRightIcon />
                  </Icon>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <ul>
                    {uniqueGroup.map((item) => {
                      const href = `/${params.framework}/docs/${item.slug}`
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

const uniqueByTitle = (items: Pages[]): Pages[] =>
  Array.from(new Map(items.map((item) => [item.title, item])).values())
