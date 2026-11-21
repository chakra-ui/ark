import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}" >
    
    <ark-listbox-label class="${styles.Label}">Select Framework</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">
  <ark-listbox-item class="${styles.Item}" value="react">
    <ark-listbox-item-text class="${styles.ItemText}">React</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>
  <ark-listbox-item class="${styles.Item}" value="solid">
    <ark-listbox-item-text class="${styles.ItemText}">Solid</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>
  <ark-listbox-item class="${styles.Item}" value="vue">
    <ark-listbox-item-text class="${styles.ItemText}">Vue</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>
  <ark-listbox-item class="${styles.Item}" value="svelte">
    <ark-listbox-item-text class="${styles.ItemText}">Svelte</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item></ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}
