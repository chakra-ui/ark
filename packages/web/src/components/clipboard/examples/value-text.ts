import { Check, ClipboardCopy, createElement } from 'lucide'

import '@ark-ui/web/clipboard'

import styles from 'styles/clipboard.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-clipboard class="${styles.Root}" default-value="https://ark-ui.com">
    <ark-clipboard-control class="${styles.Control}">
      <ark-clipboard-value-text class="${styles.ValueText}"></ark-clipboard-value-text>
      <ark-clipboard-trigger>
        <button class="${styles.Trigger}">
          <ark-clipboard-indicator class="${styles.Indicator}">${icon(ClipboardCopy)}</ark-clipboard-indicator>
          <ark-clipboard-indicator class="${styles.Indicator}" copied>${icon(Check)}</ark-clipboard-indicator>
        </button>
      </ark-clipboard-trigger>
    </ark-clipboard-control>
  </ark-clipboard>`
}
