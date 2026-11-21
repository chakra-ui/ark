import '@ark-ui/web/tooltip'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tooltip open-delay="0" close-delay="0">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">No delay</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`
}
