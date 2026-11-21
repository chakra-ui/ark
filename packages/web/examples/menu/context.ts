import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const list = (items: string) => /* html */ `<ark-menu-list class="${styles.List}">${items}</ark-menu-list>`

const item = (value: string, label: string, extra = '') =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}" ${extra}>${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu>
    <ark-menu-context-trigger class="${styles.ContextTrigger}">Right click here</ark-menu-context-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">${list(`${item('edit', 'Edit')}${item('duplicate', 'Duplicate')}${item('delete', 'Delete')}`)}</ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
