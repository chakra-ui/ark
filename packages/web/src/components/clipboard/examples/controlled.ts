import { Check, ClipboardCopy, createElement } from 'lucide'

import '@ark-ui/web/clipboard'

import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
    <ark-clipboard class="${styles.Root}" value="https://ark-ui.com">
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
    </ark-clipboard>
    <button type="button" class="${button.Root}">Change Url</button>`
  const el = host.querySelector('ark-clipboard')!
  el.addEventListener('valuechange', (event) => {
    el.setAttribute('value', event.detail.value)
  })
  host.querySelector(':scope > button')!.addEventListener('click', () => {
    el.setAttribute('value', 'https://chakra-ui.com')
  })
  root.replaceChildren(host)
}
