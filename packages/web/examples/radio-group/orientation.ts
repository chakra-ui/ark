import '../../src/components/radio-group/index.js'

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

interface RadioGroupProps {
  defaultValue: string
  orientation: 'horizontal' | 'vertical'
}

const radioGroup = ({ defaultValue, orientation }: RadioGroupProps, items: string[]) => /* html */ `
  <ark-radio-group class="${styles.Root}" default-value="${defaultValue}" orientation="${orientation}">
    <ark-radio-group-label class="${styles.Label}">Framework</ark-radio-group-label>
    <div class="hstack">${items.join('')}</div>
  </ark-radio-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = radioGroup({ defaultValue: 'React', orientation: 'horizontal' }, frameworks.map(item))
}
