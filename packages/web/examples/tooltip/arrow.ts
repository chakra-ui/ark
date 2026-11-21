import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

const arrowMarkup = /* html */ `<ark-tooltip-arrow><ark-tooltip-arrow-tip class="${styles.ArrowTip}"></ark-tooltip-arrow-tip></ark-tooltip-arrow>`

const tooltip = ({ content, arrow = false }: { content: string; arrow?: boolean }) => /* html */ `
  <ark-tooltip>
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${arrow ? arrowMarkup : ''} ${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = tooltip({ content: 'I am a tooltip!', arrow: true })
}
