import '../../src/components/radio-group/index.js'

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

const radioGroup = (items: string[]) => /* html */ `
  <ark-radio-group class="${styles.Root}">
    ${items.join('')}
  </ark-radio-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <fieldset class="${fieldset.Root}">
    <legend class="${fieldset.Legend}">Select a framework</legend>
    ${radioGroup(frameworks.map(item))}
    <span class="${fieldset.HelperText}">Choose your preferred framework</span>
    <span class="${fieldset.ErrorText}" hidden>Please select a framework</span>
  </fieldset>`
}
