import '@ark-ui/web/segment-group'

import styles from 'styles/segment-group.module.css'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

const item = ({ value, disabled = false }: { value: string; disabled?: boolean }) => /* html */ `
  <ark-segment-group-item value="${value}" ${disabled ? 'disabled' : ''}>
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
    ${frameworks.map((framework) => item({ value: framework, disabled: framework === 'Svelte' })).join('')}
  </ark-segment-group>`
}
