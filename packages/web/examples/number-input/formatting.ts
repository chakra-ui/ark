import { createElement, ArrowLeftRight, ChevronUp, ChevronDown } from 'lucide'

import '../../src/components/number-input/index.js'

import styles from 'styles/number-input.module.css'

const numberInput = (attrs: string, { scrubber = false } = {}) => /* html */ `
  <ark-number-input class="${styles.Root}" ${attrs}>
    <ark-number-input-label class="${styles.Label}">Label</ark-number-input-label>
    <ark-number-input-control class="${styles.Control}">
      ${scrubber ? /* html */ `<ark-number-input-scrubber class="${styles.Scrubber}">${createElement(ArrowLeftRight, { 'aria-hidden': 'true' }).outerHTML}</ark-number-input-scrubber>` : ''}
      <ark-number-input-input><input class="${styles.Input}" ${scrubber ? 'data-has-scrubber' : ''} /></ark-number-input-input>
      <div class="${styles.TriggerGroup}">
        <ark-number-input-increment-trigger>
          <button class="${styles.IncrementTrigger}">${createElement(ChevronUp, { 'aria-hidden': 'true' }).outerHTML}</button>
        </ark-number-input-increment-trigger>
        <ark-number-input-decrement-trigger>
          <button class="${styles.DecrementTrigger}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</button>
        </ark-number-input-decrement-trigger>
      </div>
    </ark-number-input-control>
  </ark-number-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = numberInput(`format-options='{"style":"currency","currency":"USD"}'`)
}
