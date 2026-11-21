import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

import button from 'styles/button.module.css'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const checkbox = (attrs: string, label = 'Checkbox', indeterminate = false) => `
  <ark-checkbox ${attrs}>
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        ${indeterminate ? `<ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>` : ''}
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

const group = (attrs: string, items = frameworks, indeterminate = false) => `
  <ark-checkbox-group class="${styles.Group}" ${attrs}>
    ${items.map((item) => checkbox(`value="${item.value}"`, item.label, indeterminate)).join('')}
  </ark-checkbox-group>`

const json = (value: string[]) => JSON.stringify(value)

export function mount(root: HTMLElement) {
  const form = document.createElement('form')
  form.className = 'vstack'
  form.innerHTML = `${group(`default-value="react" name="framework"`)}
    <button class="${button.Root}" type="submit">Submit</button>
    <output></output>`
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    form.querySelector('output')!.textContent = json(new FormData(form).getAll('framework') as string[])
  })
  root.replaceChildren(form)
}
