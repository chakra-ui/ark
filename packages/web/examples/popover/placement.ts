import '@ark-ui/web/popover'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover placement="right" gutter="12">
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">
        <ark-popover-title class="${styles.Title}">On the right</ark-popover-title>
        <ark-popover-description class="${styles.Description}">Placed with the placement and gutter attributes.</ark-popover-description>
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
