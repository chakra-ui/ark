import '@ark-ui/web/segment-group'

import button from 'styles/button.module.css'
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
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <button class="${button.Root}" type="button">Hide</button>
  <template>
    <ark-segment-group class="${styles.Root}" default-value="React">
      <ark-segment-group-indicator class="${styles.Indicator}"></ark-segment-group-indicator>
      ${frameworks.map((framework) => item({ value: framework })).join('')}
    </ark-segment-group>
  </template>`
  const toggle = host.querySelector('button')!
  const template = host.querySelector('template')!
  toggle.addEventListener('click', () => {
    const current = host.querySelector('ark-segment-group')
    if (current) current.remove()
    else host.append(template.content.cloneNode(true))
    toggle.textContent = current ? 'Show' : 'Hide'
  })
  host.append(template.content.cloneNode(true))
  root.replaceChildren(host)
}
