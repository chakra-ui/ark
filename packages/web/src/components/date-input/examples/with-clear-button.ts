import { createElement, X } from 'lucide'

import '@ark-ui/web/date-input'

import button from 'styles/button.module.css'
import styles from 'styles/date-input.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-input class="${styles.Root}">
    <ark-date-input-label class="${styles.Label}">Date</ark-date-input-label>
    <ark-date-input-control class="${styles.Control}">
      <ark-date-input-segment-group class="${styles.SegmentGroup}">
        <template><ark-date-input-segment class="${styles.Segment}"></ark-date-input-segment></template>
      </ark-date-input-segment-group>
      <ark-date-input-clear-trigger>
        <button class="${button.Root}" aria-label="Clear date">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button>
      </ark-date-input-clear-trigger>
    </ark-date-input-control>
    <ark-date-input-hidden-input></ark-date-input-hidden-input>
  </ark-date-input>`
}
