import '@ark-ui/web/tooltip'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tooltip>
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}"><ark-tooltip-arrow><ark-tooltip-arrow-tip class="${styles.ArrowTip}"></ark-tooltip-arrow-tip></ark-tooltip-arrow> I am a tooltip!</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`
}
