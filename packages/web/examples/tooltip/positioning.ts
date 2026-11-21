import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

interface TooltipProps {
  placement: string
  offset: string
  content?: string
}

const tooltip = ({ placement, offset, content = 'I am a tooltip!' }: TooltipProps) => /* html */ `
  <ark-tooltip placement="${placement}" offset="${offset}">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = tooltip({ placement: 'left-start', offset: '12,12' })
}
