import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tooltip placement="left-start" offset="12,12">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">I am a tooltip!</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`
}
