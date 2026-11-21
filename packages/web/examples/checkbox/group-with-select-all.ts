import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

import type { CheckedState } from '@zag-js/checkbox'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const json = (value: string[]) => JSON.stringify(value)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <output>Selected: []</output>
      
  <ark-checkbox value="all" checked="false">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">JSX Frameworks</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
      
  <ark-checkbox-group class="${styles.Group}" value="" name="framework" style="margin-inline-start: 1rem">
    
  <ark-checkbox value="react">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">React</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
  <ark-checkbox value="solid">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">Solid</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
  <ark-checkbox value="vue">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">Vue</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
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
