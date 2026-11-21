import { createElement, ChevronUp, ChevronDown } from 'lucide'

import '../../src/components/number-input/index.js'

import styles from 'styles/number-input.module.css'

const icon = (node: typeof ChevronUp) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-number-input class="${styles.Root}" allow-mouse-wheel>
    <ark-number-input-label class="${styles.Label}">Label</ark-number-input-label>
    <ark-number-input-control class="${styles.Control}">
      <ark-number-input-input><input class="${styles.Input}" /></ark-number-input-input>
      <div class="${styles.TriggerGroup}">
        <ark-number-input-increment-trigger>
          <button class="${styles.IncrementTrigger}">${icon(ChevronUp)}</button>
        </ark-number-input-increment-trigger>
        <ark-number-input-decrement-trigger>
          <button class="${styles.DecrementTrigger}">${icon(ChevronDown)}</button>
        </ark-number-input-decrement-trigger>
      </div>
    </ark-number-input-control>
  </ark-number-input>`
}
