import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <div class="${styles.Grid}">
      <div class="${styles.Stat}">
        <span class="${styles.Label}">Revenue</span>
        <ark-number-flow class="${styles.Root}" default-value="48250.75">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
      <div class="${styles.Stat}">
        <span class="${styles.Label}">Growth</span>
        <ark-number-flow class="${styles.Root} ${styles.Trend}" default-value="0.124">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
      <div class="${styles.Stat}">
        <span class="${styles.Label}">Visitors</span>
        <ark-number-flow class="${styles.Root}" default-value="1284000">
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
  flows[0].formatOptions = { style: 'currency', currency: 'USD' }
  flows[1].formatOptions = { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }
  flows[2].formatOptions = { notation: 'compact', maximumFractionDigits: 1 }
  root.querySelector('[data-action=shuffle]')!.addEventListener('click', () => {
    flows[0].value = Math.round(Math.random() * 10_000_000) / 100
    flows[1].value = Math.round((Math.random() - 0.3) * 1000) / 1000
    flows[2].value = Math.round(Math.random() * 5_000_000)
  })
}
