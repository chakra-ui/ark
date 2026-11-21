import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

interface TooltipProps {
  openDelay: number
  closeDelay: number
  content: string
}

const tooltip = ({ openDelay, closeDelay, content }: TooltipProps) => /* html */ `
  <ark-tooltip open-delay="${openDelay}" close-delay="${closeDelay}">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = tooltip({ openDelay: 0, closeDelay: 0, content: 'No delay' })
}
