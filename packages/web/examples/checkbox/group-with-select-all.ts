import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

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

const minusIcon = createElement(Minus, { 'aria-hidden': 'true' }).outerHTML

const json = (value: string[]) => JSON.stringify(value)

const checkbox = ({ label, value, checked }: Framework & { checked?: boolean }) => /* html */ `
  <ark-checkbox value="${value}" ${checked === undefined ? '' : `checked="${checked}"`}>
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
        <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${minusIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <output>Selected: []</output>
      ${checkbox({ label: 'JSX Frameworks', value: 'all', checked: false })}
      <ark-checkbox-group class="${styles.Group}" value="" name="framework" style="margin-inline-start: 1rem">
        ${frameworks.map(checkbox).join('')}
      </ark-checkbox-group>
    </div>`
  const all = root.querySelector('ark-checkbox')!
  const el = root.querySelector('ark-checkbox-group')!
  const sync = (value: string[]) => {
    el.setAttribute('value', value.join(','))
    const indeterminate = value.length > 0 && value.length < frameworks.length
    all.setAttribute('checked', indeterminate ? 'indeterminate' : String(value.length === frameworks.length))
    root.querySelector('output')!.textContent = `Selected: ${json(value)}`
  }
  all.addEventListener('checkedchange', (event) => {
    if (event.target !== all) return
    const { checked } = event.detail
    sync(checked === true ? frameworks.map((item) => item.value) : [])
  })
  el.addEventListener('valuechange', (event) => sync(event.detail.value))
}
