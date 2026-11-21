import '@ark-ui/web/tooltip'

import button from 'styles/button.module.css'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <button type="button" class="${button.Root}" data-toggle>Toggle</button>
      
  <ark-tooltip open="false">
    <ark-tooltip-trigger><button class="${styles.Trigger}">Hover Me</button></ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">I am a tooltip!</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>
    </div>`
  const tooltipEl = root.querySelector('ark-tooltip')!
  root.querySelector('[data-toggle]')!.addEventListener('click', () => {
    tooltipEl.setAttribute('open', String(tooltipEl.getAttribute('open') !== 'true'))
  })
  tooltipEl.addEventListener('openchange', (event) => {
    tooltipEl.setAttribute('open', String(event.detail.open))
  })
}
