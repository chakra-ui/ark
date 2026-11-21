import '../../src/components/segment-group/index.js'

import styles from 'styles/segment-group.module.css'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

const item = ({ value }: { value: string }) => /* html */ `
  <ark-segment-group-item value="${value}">
    <label class="${styles.Item}">
      <ark-segment-group-item-text class="${styles.ItemText}">${value}</ark-segment-group-item-text>
      <ark-segment-group-item-control class="${styles.ItemControl}"></ark-segment-group-item-control>
      <ark-segment-group-item-hidden-input></ark-segment-group-item-hidden-input>
    </label>
  </ark-segment-group-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-segment-group class="${styles.Root}" default-value="React">
    <ark-segment-group-indicator class="${styles.Indicator}"></ark-segment-group-indicator>
    ${frameworks.map((framework) => item({ value: framework })).join('')}
  </ark-segment-group>`
}
