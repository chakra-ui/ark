import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <div class="${styles.Grid}">
      <div class="${styles.Stat}">
        <span class="${styles.Label}">Throughput</span>
        <ark-number-flow class="${styles.Root}" default-value="1280" prefix="~" suffix=" req/s">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
      <div class="${styles.Stat}">
        <span class="${styles.Label}">p95 latency</span>
        <ark-number-flow class="${styles.Root}" default-value="42" suffix=" ms">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
    </div>
    <div class="${styles.Actions}">
      <button type="button" class="${button.Root}" data-action="shuffle">Shuffle</button>
    </div>
  </div>`

  const flows = root.querySelectorAll('ark-number-flow')
  root.querySelector('[data-action=shuffle]')!.addEventListener('click', () => {
    flows[0].value = Math.round(800 + Math.random() * 1200)
    flows[1].value = Math.round(20 + Math.random() * 60)
  })
}
