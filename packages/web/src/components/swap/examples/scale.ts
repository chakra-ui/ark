import { createElement, Volume2, VolumeX } from 'lucide'

import '@ark-ui/web/swap'

import styles from 'styles/swap.module.css'

const icon = (node: typeof Volume2) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <button type="button" class="${styles.Button}" aria-label="Toggle">
    <ark-swap>
      <ark-swap-indicator type="on" class="${styles.ScaleIndicator}">${icon(Volume2)}</ark-swap-indicator>
      <ark-swap-indicator type="off" class="${styles.ScaleIndicator}">${icon(VolumeX)}</ark-swap-indicator>
    </ark-swap>
  </button>`

  const swap = root.querySelector('ark-swap')!
  root.querySelector('button')!.addEventListener('click', () => swap.toggleAttribute('swap'))
}
