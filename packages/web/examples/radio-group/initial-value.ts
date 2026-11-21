import '@ark-ui/web/radio-group'

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
    <ark-radio-group class="${styles.Root}" default-value="Solid">
      <ark-radio-group-label class="${styles.Label}">Framework</ark-radio-group-label>
      ${frameworks.map(item).join('')}
    </ark-radio-group>`
}
