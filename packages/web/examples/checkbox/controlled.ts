import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const checkbox = ({ label, checked }: { label: string; checked: boolean }) => /* html */ `
  <ark-checkbox checked="${checked}">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <output>checked: true</output>
    ${checkbox({ label: 'Checkbox', checked: true })}
  </div>`
  const el = root.querySelector('ark-checkbox')!
  el.addEventListener('checkedchange', (event) => {
    const { checked } = event.detail
    el.setAttribute('checked', String(checked))
    root.querySelector('output')!.textContent = `checked: ${checked}`
  })
}
