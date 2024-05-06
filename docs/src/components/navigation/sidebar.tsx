'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '~/components/ui'
import { recipe } from './sidebar.recipe'
import type { Pages } from '.velite'

const styles = recipe()

interface Props {
  groups: Pages[][]
}

export const Sidebar = (props: Props) => {
  const { groups } = props
  const pathname = usePathname()
  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group, id) => (
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
                  {group.map((item) => (
                    <li key={item.id}>
                      <NextLink
                        href={item.href}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={styles.link}
                      >
                        {item.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </Collapsible.Content>
            </Collapsible.Root>
          </li>
        ))}
      </ul>
    </nav>
  )
}
