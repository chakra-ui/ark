import { Check, ClipboardCopy, createElement } from 'lucide'

import '@ark-ui/web/clipboard'

import styles from 'styles/clipboard.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-clipboard class="${styles.Root}" default-value="https://ark-ui.com">
    <ark-clipboard-control class="${styles.Control}">
      <ark-clipboard-trigger>
        <button class="${styles.Trigger}">
          <ark-clipboard-indicator class="${styles.Indicator}">${icon(ClipboardCopy)}</ark-clipboard-indicator>
          <ark-clipboard-indicator class="${styles.Indicator}" copied>${icon(Check)}</ark-clipboard-indicator>
          <ark-clipboard-value-text></ark-clipboard-value-text>
        </button>
      </ark-clipboard-trigger>
    </ark-clipboard-control>
    <p>Copied <output>0</output> times</p>
  </ark-clipboard>`
  const el = root.querySelector('ark-clipboard')!
  const output = root.querySelector('output')!
  let count = 0
  el.addEventListener('statuschange', (event) => {
    if (event.detail.copied) output.textContent = String(++count)
  })
}
