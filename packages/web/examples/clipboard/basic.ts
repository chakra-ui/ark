import { Check, ClipboardCopy, createElement } from 'lucide'

import '../../src/components/clipboard/index.js'

import styles from 'styles/clipboard.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-clipboard class="${styles.Root}" default-value="https://ark-ui.com">
    <ark-clipboard-label class="${styles.Label}">Copy this link</ark-clipboard-label>
    <ark-clipboard-control class="${styles.Control}">
      <ark-clipboard-input><input class="${styles.Input}" /></ark-clipboard-input>
      <ark-clipboard-trigger>
        <button class="${styles.Trigger}">
          <ark-clipboard-indicator class="${styles.Indicator}">${icon(ClipboardCopy)}</ark-clipboard-indicator>
          <ark-clipboard-indicator class="${styles.Indicator}" copied>${icon(Check)}</ark-clipboard-indicator>
        </button>
      </ark-clipboard-trigger>
    </ark-clipboard-control>
  </ark-clipboard>`
}
