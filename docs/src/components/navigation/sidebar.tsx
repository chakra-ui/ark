import { Collapsible } from '@ark-ui/react/collapsible'
import NextLink from 'next/link'
import { getSidebarGroups } from '~/lib/sidebar'
import { recipe } from './sidebar.recipe'

const styles = recipe()

export const Sidebar = () => {
  const sidebarGroups = getSidebarGroups()
  return (
    <nav>
      <ul className={styles.root}>
        {sidebarGroups.map((group, id) => (
          <li key={id} className={styles.group}>
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger className={styles.trigger}>
                {group[0].category}
              </Collapsible.Trigger>
              <Collapsible.Content>
                <ul>
                  {group.map((item) => (
                    <li key={item.id}>
                      <NextLink
                        href={item.href}
                        aria-current={'/' === item.slug}
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
