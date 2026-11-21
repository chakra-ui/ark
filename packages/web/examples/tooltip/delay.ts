import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

const tooltipMarkup = (attrs: string, content = 'I am a tooltip!') => `
  <ark-tooltip ${attrs}>
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = tooltipMarkup(`open-delay="0" close-delay="0"`, 'No delay')
}
