'use client'
import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Flex } from 'styled-system/jsx'
import { Icon } from '~/components/ui/icon'
import { Text } from '~/components/ui/text'
import type { ExampleGroup } from '~/lib/examples'
import { recipe } from '../sidebar.recipe'

const styles = recipe()

interface Props {
  groups: ExampleGroup[]
}

export const ExamplesSidebar = (props: Props) => {
  const { groups } = props
  const pathname = usePathname()

  return (
    <nav>
      <div className={styles.root}>
        {groups.map((group, id) => (
          <div key={id} className={styles.group}>
            <p className={styles.label}>{group.title}</p>
            <ul className={styles.list}>
              {group.items.map((item) => {
                const href = `/examples/${item.id}`
                return (
                  <li key={item.id}>
                    <NextLink href={href} aria-current={pathname === href ? 'page' : undefined} className={styles.link}>
                      <Flex gap="2" align="center">
                        <Text as="span">{item.title}</Text>
                        {item.accessLevel === 'paid' && (
                          <Icon width="3.5" height="3.5" color="colorPalette.default">
                            <SparklesIcon />
                          </Icon>
                        )}
                      </Flex>
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
