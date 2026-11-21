import { createElement, Bold } from 'lucide'

import '../../src/components/toggle/index.js'

import styles from 'styles/toggle.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toggle>
    <button class="${styles.Root}" aria-label="Bold">${createElement(Bold, { 'aria-hidden': 'true' }).outerHTML}</button>
  </ark-toggle>`
}
