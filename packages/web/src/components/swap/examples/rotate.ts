import { createElement, Sun, Moon } from 'lucide'

import '@ark-ui/web/swap'

import styles from 'styles/swap.module.css'

const icon = (node: typeof Sun) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <button type="button" class="${styles.Button}" aria-label="Toggle">
    <ark-swap>
      <ark-swap-indicator type="on" class="${styles.RotateIndicator}">${icon(Sun)}</ark-swap-indicator>
      <ark-swap-indicator type="off" class="${styles.RotateIndicator}">${icon(Moon)}</ark-swap-indicator>
    </ark-swap>
  </button>`

  const swap = root.querySelector('ark-swap')!
  root.querySelector('button')!.addEventListener('click', () => swap.toggleAttribute('swap'))
}
