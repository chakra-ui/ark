import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const json = (value: string[]) => JSON.stringify(value)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="vstack">
      <output>value: ["react"]</output>
      
  <ark-checkbox-group class="${styles.Group}" value="react" name="framework">
    
  <ark-checkbox value="react">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">React</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
  <ark-checkbox value="solid">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">Solid</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
  <ark-checkbox value="vue">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">Vue</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>
  </ark-checkbox-group>
    </div>`
  const el = root.querySelector('ark-checkbox-group')!
  el.addEventListener('valuechange', (event) => {
    el.setAttribute('value', event.detail.value.join(','))
    root.querySelector('output')!.textContent = `value: ${json(event.detail.value)}`
  })
}
