import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <output>Value: ["md"]</output>
      
  <ark-listbox class="${styles.Root}" value="md">
    
    <ark-listbox-label class="${styles.Label}">Select Size</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">
  <ark-listbox-item class="${styles.Item}" value="sm">
    <ark-listbox-item-text class="${styles.ItemText}">Small</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>
  <ark-listbox-item class="${styles.Item}" value="md">
    <ark-listbox-item-text class="${styles.ItemText}">Medium</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>
  <ark-listbox-item class="${styles.Item}" value="lg">
    <ark-listbox-item-text class="${styles.ItemText}">Large</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>
  <ark-listbox-item class="${styles.Item}" value="xl">
    <ark-listbox-item-text class="${styles.ItemText}">Extra Large</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item></ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>
    </div>`
  const el = root.querySelector('ark-listbox')!
  el.addEventListener('valuechange', (event) => {
    const value = event.detail.value
    el.setAttribute('value', value.join(','))
    root.querySelector('output')!.textContent = `Value: ${JSON.stringify(value)}`
  })
}
