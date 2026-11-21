import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const popoverMarkup = (attrs: string, body: string) => `
  <ark-popover ${attrs}>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${body}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

export function mount(root: HTMLElement) {
  root.innerHTML = popoverMarkup(
    `placement="right" gutter="12"`,
    `<ark-popover-title class="${styles.Title}">On the right</ark-popover-title>
     <ark-popover-description class="${styles.Description}">Placed with the placement and gutter attributes.</ark-popover-description>`,
  )
}
