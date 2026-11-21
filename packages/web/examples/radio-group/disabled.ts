import '../../src/components/radio-group/index.js'

import styles from 'styles/radio-group.module.css'

const frameworks = ['React', 'Solid', 'Vue']

const attr = (name: string, on?: boolean) => (on ? name : '')

const item = ({ value, disabled = false }: { value: string; disabled?: boolean }) => /* html */ `
  <ark-radio-group-item value="${value}" ${attr('disabled', disabled)}>
    <label class="${styles.Item}">
      <ark-radio-group-item-control class="${styles.ItemControl}"></ark-radio-group-item-control>
      <ark-radio-group-item-text class="${styles.ItemText}">${value}</ark-radio-group-item-text>
      <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
    </label>
  </ark-radio-group-item>`

const radioGroup = ({ defaultValue }: { defaultValue: string }, items: string[]) => /* html */ `
  <ark-radio-group class="${styles.Root}" default-value="${defaultValue}">
    <ark-radio-group-label class="${styles.Label}">Framework</ark-radio-group-label>
    ${items.join('')}
  </ark-radio-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = radioGroup(
    { defaultValue: 'React' },
    frameworks.map((value) => item({ value, disabled: value === 'Solid' })),
  )
}
