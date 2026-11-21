import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <output>checked: true</output>
    <ark-checkbox checked="true">
      <label class="${styles.Root}">
        <ark-checkbox-control class="${styles.Control}">
          <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
        </ark-checkbox-control>
        <ark-checkbox-label class="${styles.Label}">Checkbox</ark-checkbox-label>
        <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
      </label>
    </ark-checkbox>
  </div>`
  const el = root.querySelector('ark-checkbox')!
  el.addEventListener('checkedchange', (event) => {
    const { checked } = event.detail
    el.setAttribute('checked', String(checked))
    root.querySelector('output')!.textContent = `checked: ${checked}`
  })
}
