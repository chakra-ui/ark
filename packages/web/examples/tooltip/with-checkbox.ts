import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import '../../src/components/tooltip/index.js'

import checkbox from 'styles/checkbox.module.css'

import styles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tooltip>
    <ark-tooltip-trigger>
      <ark-checkbox>
        <label class="${checkbox.Root}">
          <ark-checkbox-control class="${checkbox.Control}">
            <ark-checkbox-indicator class="${checkbox.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
          </ark-checkbox-control>
          <ark-checkbox-label class="${checkbox.Label}">Accept terms</ark-checkbox-label>
          <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
        </label>
      </ark-checkbox>
    </ark-tooltip-trigger>
    <ark-tooltip-positioner class="${styles.Positioner}">
      <ark-tooltip-content class="${styles.Content}">Required to continue</ark-tooltip-content>
    </ark-tooltip-positioner>
  </ark-tooltip>`
}
