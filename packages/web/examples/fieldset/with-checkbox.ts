import { Check, createElement } from 'lucide'

import '../../src/components/checkbox/index.js'
import '../../src/components/fieldset/index.js'

import checkbox from 'styles/checkbox.module.css'
import styles from 'styles/fieldset.module.css'

const item = (label: string, attrs = '') => /* html */ `
      <ark-checkbox ${attrs}>
        <label class="${checkbox.Root}">
          <ark-checkbox-control class="${checkbox.Control}">
            <ark-checkbox-indicator class="${checkbox.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
          </ark-checkbox-control>
          <ark-checkbox-label class="${checkbox.Label}">${label}</ark-checkbox-label>
          <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
        </label>
      </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset>
    <fieldset class="${styles.Root}">
      <ark-fieldset-legend class="${styles.Legend}">Email Preferences</ark-fieldset-legend>
      ${item('Product updates', 'default-checked')}
      ${item('Marketing emails')}
    </fieldset>
  </ark-fieldset>`
}
