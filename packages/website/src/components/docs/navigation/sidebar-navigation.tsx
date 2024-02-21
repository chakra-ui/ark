import { ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Icon } from '~/components/ui'
import { recipe } from './sidebar.recipe'

interface Item {
  id: string
  name: string
  href?: string
  items?: Item[]
}

export interface SidebarNavigationProps {
  items: Item[]
}

const styles = recipe()

export const SidebarNavigation = (props: SidebarNavigationProps) => {
  const { items } = props
  const [currentPath, setCurrentPath] = useState<string>()

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    document.addEventListener('astro:after-swap', () => {
      setCurrentPath(window.location.pathname)
    })
  }, [])

  const renderItem = (item: Item, depth = 1) => {
    if (item.items) {
      return (
        <li key={item.name}>
          {/* @ts-expect-error */}
          <div className={styles.header} data-depth={depth} style={{ '--depth': depth }}>
            <Icon size="sm">
              <ChevronRightIcon />
            </Icon>
            <span>{item.name}</span>
          </div>
          <ul key={item.id} data-depth={depth} className={styles.list}>
            {item.items.map((i) => renderItem(i, depth + 1))}
          </ul>
        </li>
      )
    }
    return (
      <li key={item.name} className={styles.item}>
        <a
          href={item.href}
          className={styles.link}
          aria-current={item.href === currentPath ? 'page' : undefined}
          // @ts-expect-error wtf react
          style={{ '--depth': depth }}
        >
          {item.name}
        </a>
      </li>
    )
  }

  return (
    <aside>
      <nav>
        <ul className={styles.root}>{items.map((item) => renderItem(item))}</ul>
      </nav>
    </aside>
  )
}
