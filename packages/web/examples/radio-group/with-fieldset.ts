import '../../src/components/radio-group/index.js'
import '../../src/components/fieldset/index.js'

import fieldset from 'styles/fieldset.module.css'

import styles from 'styles/radio-group.module.css'

const frameworks = ['React', 'Solid', 'Vue']

const item = (value: string) => /* html */ `
  <ark-radio-group-item value="${value}">
    <label class="${styles.Item}">
      <ark-radio-group-item-control class="${styles.ItemControl}"></ark-radio-group-item-control>
      <ark-radio-group-item-text class="${styles.ItemText}">${value}</ark-radio-group-item-text>
      <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
    </label>
  </ark-radio-group-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset>
    <fieldset class="${fieldset.Root}">
      <ark-fieldset-legend class="${fieldset.Legend}">Select a framework</ark-fieldset-legend>
      <ark-radio-group class="${styles.Root}">
        ${frameworks.map(item).join('')}
      </ark-radio-group>
      <ark-fieldset-helper-text class="${fieldset.HelperText}">Choose your preferred framework</ark-fieldset-helper-text>
      <ark-fieldset-error-text class="${fieldset.ErrorText}">Please select a framework</ark-fieldset-error-text>
    </fieldset>
  </ark-fieldset>`
}
