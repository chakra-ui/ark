import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <div class="${styles.Grid}">
      <div class="${styles.Stat}">
        <span class="${styles.Label}">English</span>
        <ark-number-flow class="${styles.Root}" default-value="1234567.89" locale="en-US">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
      <div class="${styles.Stat}">
        <span class="${styles.Label}">Deutsch</span>
        <ark-number-flow class="${styles.Root}" default-value="1234567.89" locale="de-DE">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
      <div class="${styles.Stat}">
        <span class="${styles.Label}">العربية</span>
        <ark-number-flow class="${styles.Root}" default-value="1234567.89" locale="ar-EG">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
      <div class="${styles.Stat}">
        <span class="${styles.Label}">हिन्दी</span>
        <ark-number-flow class="${styles.Root}" default-value="1234567.89" locale="hi-IN-u-nu-deva">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
      </div>
    </div>
    <button type="button" class="${button.Root}" data-action="shuffle">Shuffle</button>
  </div>`

  const flows = root.querySelectorAll('ark-number-flow')
  root.querySelector('[data-action=shuffle]')!.addEventListener('click', () => {
    const value = Math.round(Math.random() * 10_000_000) / 100
    for (const flow of flows) flow.value = value
  })
}
