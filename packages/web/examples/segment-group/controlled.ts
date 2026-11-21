import '../../src/components/segment-group/index.js'

import styles from 'styles/segment-group.module.css'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <ark-segment-group class="${styles.Root}" value="" name="framework">
    <ark-segment-group-indicator class="${styles.Indicator}"></ark-segment-group-indicator>
    ${frameworks
      .map(
        (framework) => /* html */ `
    <ark-segment-group-item value="${framework}">
      <label class="${styles.Item}">
        <ark-segment-group-item-text class="${styles.ItemText}">${framework}</ark-segment-group-item-text>
        <ark-segment-group-item-control class="${styles.ItemControl}"></ark-segment-group-item-control>
        <ark-segment-group-item-hidden-input></ark-segment-group-item-hidden-input>
      </label>
    </ark-segment-group-item>`,
      )
      .join('')}
  </ark-segment-group>
  <output>value: null</output>`
  const el = host.querySelector('ark-segment-group')!
  el.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    el.setAttribute('value', value ?? '')
    host.querySelector('output')!.textContent = `value: ${value}`
  })
  root.replaceChildren(host)
}
