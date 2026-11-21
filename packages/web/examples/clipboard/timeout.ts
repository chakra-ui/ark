import { Check, ClipboardCopy, createElement } from 'lucide'

import '@ark-ui/web/clipboard'

import styles from 'styles/clipboard.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-clipboard class="${styles.Root}" default-value="https://ark-ui.com" timeout="5000">
    <ark-clipboard-label class="${styles.Label}">Copy this link (5 second timeout)</ark-clipboard-label>
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
