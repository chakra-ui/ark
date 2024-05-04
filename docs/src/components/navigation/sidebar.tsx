import { Collapsible } from '@ark-ui/react/collapsible'
import NextLink from 'next/link'
import { recipe } from './sidebar.recipe'

interface SidebarGroup {
  name: string
  items: {
    name: string
    href: string
    label?: string
  }[]
}

export interface Props {
  groups: SidebarGroup[]
  pathname: string
}

const styles = recipe()

export const Sidebar = (props: Props) => {
  const { groups, pathname } = props

  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group) => (
          <li key={group.name} className={styles.group}>
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger className={styles.trigger}>{group.name}</Collapsible.Trigger>
              <Collapsible.Content>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <NextLink
                        href={item.href}
                        aria-current={pathname === item.href}
                        className={styles.link}
                      >
                        {item.name}
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
