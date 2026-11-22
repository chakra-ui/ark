import '@ark-ui/web/menu'
import '@ark-ui/web/menubar'

import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) =>
  /* html */ `<ark-menu-item class="${menu.Item}" value="${value}">${label}</ark-menu-item>`

const menuMarkup = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu placement="right-start">
    <ark-menu-trigger><button class="${styles.Trigger}">${label}</button></ark-menu-trigger>
    <ark-menu-positioner class="${menu.Positioner}">
      <ark-menu-content class="${menu.Content}">
        <ark-menu-list class="${menu.List}">${items.join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const menus: { label: string; items: Item[] }[] = [
  {
    label: 'Account',
    items: [
      { value: 'profile', label: 'Profile' },
      { value: 'billing', label: 'Billing' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { value: 'members', label: 'Members' },
      { value: 'integrations', label: 'Integrations' },
    ],
  },
  {
    label: 'Help',
    items: [
      { value: 'docs', label: 'Documentation' },
      { value: 'support', label: 'Contact Support' },
    ],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menubar class="${styles.Root}" orientation="vertical">
    ${menus
      .map(({ label, items }) =>
        menuMarkup(
          { label },
          items.map((entry) => item(entry)),
        ),
      )
      .join('')}
  </ark-menubar>`
}
