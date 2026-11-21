import { createElement, Heart } from 'lucide'

import '../../src/components/toggle/index.js'

import styles from 'styles/toggle.module.css'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <output>pressed: false</output>
  <ark-toggle pressed="false">
    <button class="${styles.Root}" aria-label="Favorite">
      <ark-toggle-indicator class="${styles.Indicator}">${createElement(Heart, { 'aria-hidden': 'true', fill: 'currentColor' }).outerHTML}</ark-toggle-indicator>
      <ark-toggle-indicator class="${styles.Indicator}" fallback>${createElement(Heart, { 'aria-hidden': 'true' }).outerHTML}</ark-toggle-indicator>
    </button>
  </ark-toggle>`
  const el = host.querySelector('ark-toggle')!
  el.addEventListener('pressedchange', (event) => {
    el.setAttribute('pressed', String(event.detail))
    host.querySelector('output')!.textContent = `pressed: ${event.detail}`
  })
  root.replaceChildren(host)
}
