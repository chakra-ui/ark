import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

interface Item {
  value: string
  label: string
}

const list = (items: string[]) => /* html */ `<ark-menu-list class="${styles.List}">${items.join('')}</ark-menu-list>`

const item = ({ value, label }: Item) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

const separator = () => /* html */ `<ark-menu-separator class="${styles.Separator}"></ark-menu-separator>`

const submenu = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu unmount-on-exit>
    <ark-menu-trigger-item class="${styles.TriggerItem}">${label}</ark-menu-trigger-item>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}"><template>${list(items)}</template></ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const editItems: Item[] = [
  { value: 'cut', label: 'Cut' },
  { value: 'copy', label: 'Copy' },
  { value: 'paste', label: 'Paste' },
]

const shareItems: Item[] = [
  { value: 'email', label: 'Email' },
  { value: 'message', label: 'Message' },
  { value: 'airdrop', label: 'AirDrop' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu unmount-on-exit>
    <ark-menu-context-trigger class="${styles.ContextTrigger}">Right click here</ark-menu-context-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <template>
          ${list([...editItems.map(item), separator(), submenu({ label: 'Share' }, shareItems.map(item))])}
        </template>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
