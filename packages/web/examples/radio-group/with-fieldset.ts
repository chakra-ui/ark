import '@ark-ui/web/radio-group'

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
  <fieldset class="${fieldset.Root}">
    <legend class="${fieldset.Legend}">Select a framework</legend>
    <ark-radio-group class="${styles.Root}">
      ${frameworks.map(item).join('')}
    </ark-radio-group>
    <span class="${fieldset.HelperText}">Choose your preferred framework</span>
    <span class="${fieldset.ErrorText}" hidden>Please select a framework</span>
  </fieldset>`
}
