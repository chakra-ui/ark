import '../../src/components/radio-group/index.js'

import styles from 'styles/radio-group.module.css'

const radioGroup = (
  attrs: string,
  { disabled = '', indicator = false, hstack = false, label = true } = {},
) => /* html */ `
  <ark-radio-group class="${styles.Root}" ${attrs}>
    ${label ? /* html */ `<ark-radio-group-label class="${styles.Label}">Framework</ark-radio-group-label>` : ''}
    ${indicator ? /* html */ `<ark-radio-group-indicator class="${styles.Indicator}"></ark-radio-group-indicator>` : ''}
    ${hstack ? /* html */ `<div class="hstack">` : ''}
    ${['React', 'Solid', 'Vue']
      .map(
        (framework) => /* html */ `
      <ark-radio-group-item value="${framework}" ${disabled === framework ? 'disabled' : ''}>
        <label class="${styles.Item}">
          <ark-radio-group-item-control class="${styles.ItemControl}"></ark-radio-group-item-control>
          <ark-radio-group-item-text class="${styles.ItemText}">${framework}</ark-radio-group-item-text>
          <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
        </label>
      </ark-radio-group-item>`,
      )
      .join('')}
    ${hstack ? '</div>' : ''}
  </ark-radio-group>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `<output>value: null</output>${radioGroup('value=""')}`
  const el = host.querySelector('ark-radio-group')!
  el.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    el.setAttribute('value', value ?? '')
    host.querySelector('output')!.textContent = `value: ${value}`
  })
  root.replaceChildren(host)
}
