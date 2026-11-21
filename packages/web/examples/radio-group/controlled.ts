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

const radioGroup = ({ value }: { value: string }, items: string[]) => /* html */ `
  <ark-radio-group class="${styles.Root}" value="${value}">
    <ark-radio-group-label class="${styles.Label}">Framework</ark-radio-group-label>
    ${items.join('')}
  </ark-radio-group>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `<output>value: null</output>${radioGroup({ value: '' }, frameworks.map(item))}`
  const el = host.querySelector('ark-radio-group')!
  el.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    el.setAttribute('value', value ?? '')
    host.querySelector('output')!.textContent = `value: ${value}`
  })
  root.replaceChildren(host)
}
