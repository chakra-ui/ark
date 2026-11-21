import { createElement, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

import button from 'styles/button.module.css'

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
  <ark-select class="${styles.Root}" >
    <ark-select-label class="${styles.Label}">Framework</ark-select-label>
    
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select a Framework"></ark-select-value-text><ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator></button></ark-select-trigger>
    <ark-select-clear-trigger><button class="${styles.ClearTrigger}">Clear</button></ark-select-clear-trigger>
  </ark-select-control>
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" >
      <button class="${button.Root}" style="width: 100%; margin-bottom: 0.25rem" type="button">Select All</button><ark-select-list class="${styles.List}">
  <ark-select-item class="${styles.Item}" value="React" >
    <ark-select-item-text class="${styles.ItemText}">React</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  <ark-select-item class="${styles.Item}" value="Solid" >
    <ark-select-item-text class="${styles.ItemText}">Solid</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  <ark-select-item class="${styles.Item}" value="Vue" >
    <ark-select-item-text class="${styles.ItemText}">Vue</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  <ark-select-item class="${styles.Item}" value="Svelte" >
    <ark-select-item-text class="${styles.ItemText}">Svelte</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item></ark-select-list>
    </ark-select-content>
  </ark-select-positioner>
  </ark-select>`
  const el = container.querySelector('ark-select')!
  container.querySelector('button[type="button"]')!.addEventListener('click', () => {
    el.api?.selectAll()
    el.api?.setOpen(false)
  })
}
