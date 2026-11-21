import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

import button from 'styles/button.module.css'

interface Framework {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const json = (value: string[]) => JSON.stringify(value)

const group = ({ defaultValue, name }: { defaultValue: string; name: string }, children: string[]) => /* html */ `
  <ark-checkbox-group class="${styles.Group}" default-value="${defaultValue}" name="${name}">
    ${children.join('')}
  </ark-checkbox-group>`

const checkbox = ({ label, value }: Framework) => /* html */ `
  <ark-checkbox value="${value}">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  const form = document.createElement('form')
  form.className = 'vstack'
  form.innerHTML = /* html */ `
    ${group({ defaultValue: 'react', name: 'framework' }, frameworks.map(checkbox))}
    <button class="${button.Root}" type="submit">Submit</button>
    <output></output>`
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    form.querySelector('output')!.textContent = json(new FormData(form).getAll('framework') as string[])
  })
  root.replaceChildren(form)
}
