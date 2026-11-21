import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div style="position: fixed; top: 40px; left: 40px; padding: 40px; background: red">
    <ark-tooltip strategy="fixed">
      <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
      <ark-tooltip-positioner class="${styles.Positioner}">
        <ark-tooltip-content class="${styles.Content}">I am a tooltip!</ark-tooltip-content>
      </ark-tooltip-positioner>
    </ark-tooltip>
  </div>`
}
