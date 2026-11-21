import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

const tooltip = ({ placement, content }: { placement: string; content: string }) => /* html */ `
  <ark-tooltip placement="${placement}">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = tooltip({ placement: 'right', content: 'On the right' })
}
