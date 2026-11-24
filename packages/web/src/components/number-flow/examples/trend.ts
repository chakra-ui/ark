import { createElement, TrendingDown, TrendingUp } from 'lucide'

import '@ark-ui/web/number-flow'

import styles from 'styles/number-flow.module.css'

const open = 182.4

const icon = (node: typeof TrendingUp) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <div class="${styles.Header}">
      <span class="${styles.Label}">ARK · Nasdaq</span>
      <span class="${styles.Badge}" data-trend="up">
        <span data-icon>${icon(TrendingUp)}</span>
        <ark-number-flow class="${styles.Root}" value="0">
          <ark-number-flow-segments></ark-number-flow-segments>
          <ark-number-flow-value-text></ark-number-flow-value-text>
        </ark-number-flow>
      </span>
    </div>
    <ark-number-flow class="${styles.Root} ${styles.Display} ${styles.Trend}" value="${open}" trend="true">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
    <span class="${styles.Caption}">Digits roll in the direction the price moved.</span>
  </div>`

  const [change, price] = root.querySelectorAll('ark-number-flow')
  const badge = root.querySelector<HTMLElement>(`.${styles.Badge}`)!
  const badgeIcon = root.querySelector<HTMLElement>('[data-icon]')!

  price.formatOptions = { style: 'currency', currency: 'USD' }
  change.formatOptions = { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' }

  let current = open
  const id = setInterval(() => {
    if (!price.isConnected) return clearInterval(id)
    current = Math.max(1, current + (Math.random() - 0.48) * 3)
    const delta = (current - open) / open
    const direction = delta >= 0 ? 'up' : 'down'
    price.setAttribute('value', String(current))
    change.setAttribute('value', String(delta))
    if (badge.dataset.trend !== direction) {
      badge.dataset.trend = direction
      badgeIcon.innerHTML = icon(direction === 'up' ? TrendingUp : TrendingDown)
    }
  }, 1600)
}
