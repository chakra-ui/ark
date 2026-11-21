import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

const tooltipMarkup = (attrs: string, content = 'I am a tooltip!') => /* html */ `
  <ark-tooltip ${attrs}>
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div style="position: fixed; top: 40px; left: 40px; padding: 40px; background: red">
    ${tooltipMarkup('strategy="fixed"')}
  </div>`
}
