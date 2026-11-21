import { createElement, Play, Pause } from 'lucide'

import '@ark-ui/web/swap'

import styles from 'styles/swap.module.css'

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <button type="button" class="${styles.Button}" aria-label="Toggle">
    <ark-swap style="perspective: 200px">
      <ark-swap-indicator type="on" class="${styles.FlipIndicator}">${icon(Play)}</ark-swap-indicator>
      <ark-swap-indicator type="off" class="${styles.FlipIndicator}">${icon(Pause)}</ark-swap-indicator>
    </ark-swap>
  </button>`

  const swap = root.querySelector('ark-swap')!
  root.querySelector('button')!.addEventListener('click', () => swap.toggleAttribute('swap'))
}
