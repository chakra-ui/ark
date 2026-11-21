import '../../src/components/avatar/index.js'
import '../../src/components/menu/index.js'

import styles from 'styles/avatar.module.css'
import menuStyles from 'styles/menu.module.css'

interface User {
  id: string
  name: string
  initials: string
  src: string
}

const users: User[] = [
  { id: 'pa', name: 'Pauline Adebayo', initials: 'PA', src: 'https://i.pravatar.cc/300?u=a' },
  { id: 'mk', name: 'Marcus Kim', initials: 'MK', src: 'https://i.pravatar.cc/300?u=b' },
  { id: 'jr', name: 'Jordan Reed', initials: 'JR', src: 'https://i.pravatar.cc/300?u=c' },
  { id: 'sl', name: 'Sara Liu', initials: 'SL', src: 'https://i.pravatar.cc/300?u=d' },
  { id: 'tw', name: 'Taylor West', initials: 'TW', src: 'https://i.pravatar.cc/300?u=e' },
]

const max = 3

const visible = users.slice(0, max)

const hidden = users.slice(max)

const triggerStyle =
  'all: unset; display: inline-flex; border-radius: 9999px; cursor: pointer; margin-inline-start: -0.75rem'

const avatar = ({ user, className = styles.Root }: { user: User; className?: string }) => /* html */ `
  <ark-avatar class="${className}">
    <ark-avatar-fallback class="${styles.Fallback}">${user.initials}</ark-avatar-fallback>
    <ark-avatar-image><img class="${styles.Image}" src="${user.src}" alt="${user.name}" /></ark-avatar-image>
  </ark-avatar>`

const overflowMenu = ({ count }: { count: number }, children: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button type="button" style="${triggerStyle}" aria-label="Show ${count} more">
        <ark-avatar class="${styles.Root}">
          <ark-avatar-fallback class="${styles.Fallback}">+${count}</ark-avatar-fallback>
        </ark-avatar>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${menuStyles.Positioner}">
      <ark-menu-content class="${menuStyles.Content}">
        <ark-menu-list class="${menuStyles.List}">
          ${children.join('')}
        </ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const menuItem = (user: User) => /* html */ `
  <ark-menu-item class="${menuStyles.Item}" value="${user.id}">
    ${avatar({ user, className: `${styles.Root} ${styles.MenuAvatar}` })}
    ${user.name}
  </ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Stack}">
    ${visible.map((user) => avatar({ user })).join('')}
    ${overflowMenu({ count: hidden.length }, hidden.map(menuItem))}
  </div>`
}
