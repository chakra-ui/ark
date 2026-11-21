import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

interface TooltipProps {
  strategy: 'absolute' | 'fixed'
  content?: string
}

const tooltip = ({ strategy, content = 'I am a tooltip!' }: TooltipProps) => /* html */ `
  <ark-tooltip strategy="${strategy}">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div style="position: fixed; top: 40px; left: 40px; padding: 40px; background: red">
    ${tooltip({ strategy: 'fixed' })}
  </div>`
}
