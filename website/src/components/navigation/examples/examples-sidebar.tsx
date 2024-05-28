'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Icon } from '~/components/ui'
import { recipe } from '../sidebar.recipe'
import type { Pages } from '.velite'

const styles = recipe()

interface Item {
  id: string
  title: string
  items: Item[]
}

interface Props {
  groups: Item[]
}

export const ExamplesSidebar = (props: Props) => {
  const pathname = usePathname()
  const params = useParams<{ framework: string }>()
  const { groups } = props

  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group, id) => {
          return (
            <li key={id} className={styles.group}>
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
                      const href = `/${params.framework}/examples/${group.id}/${item.id}`
                      return (
                        <li key={item.id}>
                          <NextLink
                            href={href}
                            aria-current={pathname === href ? 'page' : undefined}
                            className={styles.link}
                          >
                            {item.title}
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
