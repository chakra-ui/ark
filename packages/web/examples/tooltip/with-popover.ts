import '../../src/components/popover/index.js'

import '../../src/components/tooltip/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/tooltip.module.css'

import popover from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover>
    <ark-tooltip>
      <ark-tooltip-trigger>
        <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
      </ark-tooltip-trigger>
      <ark-tooltip-positioner class="${styles.Positioner}">
        <ark-tooltip-content class="${styles.Content}">See more details</ark-tooltip-content>
      </ark-tooltip-positioner>
    </ark-tooltip>
    <ark-popover-positioner class="${popover.Positioner}">
      <ark-popover-content class="${popover.Content}">
        <ark-popover-title class="${popover.Title}">Favorite Frameworks</ark-popover-title>
        <ark-popover-description class="${popover.Description}">Manage and organize your favorite web frameworks.</ark-popover-description>
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
