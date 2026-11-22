import '@ark-ui/web/tooltip'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tooltip open-delay="0">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">I follow your cursor</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`

  const tooltip = root.querySelector('ark-tooltip')!
  const trigger = root.querySelector('button')!
  let pointer: { x: number; y: number } | null = null

  tooltip.positioning = {
    placement: 'bottom-start',
    gutter: 12,
    getAnchorElement() {
      if (!pointer) return null
      const { x, y } = pointer
      return { contextElement: trigger, getBoundingClientRect: () => new DOMRect(x, y, 0, 0) }
    },
  }

  trigger.addEventListener('pointermove', (event) => {
    pointer = { x: event.clientX, y: event.clientY }
    tooltip.api?.reposition()
  })
}
