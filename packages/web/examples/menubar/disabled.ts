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
  <ark-menu>
    <ark-menu-trigger><button class="${styles.Trigger}">${label}</button></ark-menu-trigger>
    <ark-menu-positioner class="${menu.Positioner}">
      <ark-menu-content class="${menu.Content}">
        <ark-menu-list class="${menu.List}">${items.join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menubar class="${styles.Root}" disabled>
    ${menuMarkup({ label: 'File' }, [item({ value: 'new', label: 'New File' })])}
    ${menuMarkup({ label: 'Edit' }, [item({ value: 'undo', label: 'Undo' })])}
  </ark-menubar>`
}
