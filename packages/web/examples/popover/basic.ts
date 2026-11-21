import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover >
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}"><ark-popover-title class="${styles.Title}">Favorite Frameworks</ark-popover-title>
     <ark-popover-description class="${styles.Description}">Manage and organize your favorite web frameworks.</ark-popover-description></ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
