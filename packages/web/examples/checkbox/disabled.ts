import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-checkbox disabled>
      <label class="${styles.Root}">
        <ark-checkbox-control class="${styles.Control}">
          <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
        </ark-checkbox-control>
        <ark-checkbox-label class="${styles.Label}">Checkbox</ark-checkbox-label>
        <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
      </label>
    </ark-checkbox>`
}
