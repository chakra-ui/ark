import { createElement, RotateCcw } from 'lucide'

import '@ark-ui/web/signature-pad'

import styles from 'styles/signature-pad.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-signature-pad class="${styles.Root}" name="signature">
    <ark-signature-pad-label class="${styles.Label}">Sign below</ark-signature-pad-label>
    <ark-signature-pad-control class="${styles.Control}">
      <ark-signature-pad-segment><svg class="${styles.Segment}"><title>Signature</title></svg></ark-signature-pad-segment>
      <ark-signature-pad-clear-trigger>
        <button class="${styles.ClearTrigger}">${createElement(RotateCcw, { 'aria-hidden': 'true' }).outerHTML}</button>
      </ark-signature-pad-clear-trigger>
      <ark-signature-pad-guide class="${styles.Guide}"></ark-signature-pad-guide>
    </ark-signature-pad-control>
    <ark-signature-pad-hidden-input></ark-signature-pad-hidden-input>
  </ark-signature-pad>`
}
