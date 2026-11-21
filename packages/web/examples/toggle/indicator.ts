import { createElement, Heart } from 'lucide'

import '@ark-ui/web/toggle'

import styles from 'styles/toggle.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toggle>
    <button class="${styles.Root}" aria-label="Favorite">
      <ark-toggle-indicator class="${styles.Indicator}">${createElement(Heart, { 'aria-hidden': 'true', fill: 'currentColor' }).outerHTML}</ark-toggle-indicator>
      <ark-toggle-indicator class="${styles.Indicator}" fallback>${createElement(Heart, { 'aria-hidden': 'true' }).outerHTML}</ark-toggle-indicator>
    </button>
  </ark-toggle>`
}
