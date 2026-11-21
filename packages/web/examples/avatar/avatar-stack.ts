import '../../src/components/avatar/index.js'
import '../../src/components/menu/index.js'

import styles from 'styles/avatar.module.css'
import menuStyles from 'styles/menu.module.css'

const users = [
  { id: 'pa', name: 'Pauline Adebayo', initials: 'PA', src: 'https://i.pravatar.cc/300?u=a' },
  { id: 'mk', name: 'Marcus Kim', initials: 'MK', src: 'https://i.pravatar.cc/300?u=b' },
  { id: 'jr', name: 'Jordan Reed', initials: 'JR', src: 'https://i.pravatar.cc/300?u=c' },
  { id: 'sl', name: 'Sara Liu', initials: 'SL', src: 'https://i.pravatar.cc/300?u=d' },
  { id: 'tw', name: 'Taylor West', initials: 'TW', src: 'https://i.pravatar.cc/300?u=e' },
]

const max = 3
const visible = users.slice(0, max)
const hidden = users.slice(max)

const avatar = (user: (typeof users)[number], className: string) => /* html */ `
  <ark-avatar class="${className}">
    <ark-avatar-fallback class="${styles.Fallback}">${user.initials}</ark-avatar-fallback>
    <ark-avatar-image><img class="${styles.Image}" src="${user.src}" alt="${user.name}" /></ark-avatar-image>
  </ark-avatar>`

const trigger =
  'all: unset; display: inline-flex; border-radius: 9999px; cursor: pointer; margin-inline-start: -0.75rem'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Stack}">
    ${visible.map((user) => avatar(user, styles.Root)).join('')}
    <ark-menu>
      <ark-menu-trigger>
        <button type="button" style="${trigger}" aria-label="Show ${hidden.length} more">
          <ark-avatar class="${styles.Root}">
            <ark-avatar-fallback class="${styles.Fallback}">+${hidden.length}</ark-avatar-fallback>
          </ark-avatar>
        </button>
      </ark-menu-trigger>
      <ark-menu-positioner class="${menuStyles.Positioner}">
        <ark-menu-content class="${menuStyles.Content}">
          <ark-menu-list class="${menuStyles.List}">
            ${hidden
              .map(
                (user) => /* html */ `
            <ark-menu-item class="${menuStyles.Item}" value="${user.id}">
              ${avatar(user, `${styles.Root} ${styles.MenuAvatar}`)}
              ${user.name}
            </ark-menu-item>`,
              )
              .join('')}
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>
  </div>`
}
