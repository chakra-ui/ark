'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon, CirclePlus } from 'lucide-react'
import NextLink from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { HStack } from 'styled-system/jsx'
import { Icon, Text } from '~/components/ui'
import type { ExampleGroup } from '~/lib/examples'
import { recipe } from '../sidebar.recipe'

const styles = recipe()

interface Props {
  groups: ExampleGroup[]
}

export const ExamplesSidebar = (props: Props) => {
  const { groups } = props
  const pathname = usePathname()
  const params = useParams<{ framework: string }>()

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
                      const href = `/${params.framework}/examples/${item.id}`
                      return (
                        <li key={item.id}>
                          <NextLink
                            href={href}
                            aria-current={pathname === href ? 'page' : undefined}
                            className={styles.link}
                          >
                            <HStack justifyContent="space-between" width="full">
                              <Text as="span">{item.title}</Text>
                              {item.accessLevel === 'paid' && (
                                <Icon size="sm" color="accent.default">
                                  <CirclePlus />
                                </Icon>
                              )}
                            </HStack>
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
