import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const prices = { monthly: 24, yearly: 19.2 }

type Billing = keyof typeof prices

const currency = { style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' } as const

const captions: Record<Billing, string> = {
  monthly: 'Billed monthly. Cancel anytime.',
  yearly: 'Billed $230.40 a year. You save 20%.',
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <div class="${styles.Header}">
      <span class="${styles.Label}">Pro plan</span>
      <div class="${styles.Toggle}">
        <button type="button" class="${styles.ToggleItem}" data-billing="monthly" aria-pressed="true">Monthly</button>
        <button type="button" class="${styles.ToggleItem}" data-billing="yearly" aria-pressed="false">Yearly</button>
      </div>
    </div>
    <div class="${styles.Price}">
      <ark-number-flow class="${styles.Root}" value="${prices.monthly}" trend="true">
        <ark-number-flow-segments></ark-number-flow-segments>
        <ark-number-flow-value-text></ark-number-flow-value-text>
      </ark-number-flow>
      <span class="${styles.Period}">/ month</span>
    </div>
    <span class="${styles.Caption}" data-caption>${captions.monthly}</span>
    <button type="button" class="${button.Root}" data-variant="solid">Get started</button>
  </div>`

  const flow = root.querySelector('ark-number-flow')!
  flow.formatOptions = currency
  const caption = root.querySelector<HTMLElement>('[data-caption]')!
  const options = root.querySelectorAll<HTMLButtonElement>('[data-billing]')

  for (const option of options) {
    option.addEventListener('click', () => {
      const billing = option.dataset.billing as Billing
      for (const other of options) other.setAttribute('aria-pressed', String(other === option))
      flow.setAttribute('value', String(prices[billing]))
      caption.textContent = captions[billing]
    })
  }
}
