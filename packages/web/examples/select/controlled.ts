import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <div class="stack">
      <output>Value: []</output>
      
  <ark-select class="${styles.Root}" value="">
    <ark-select-label class="${styles.Label}">Framework</ark-select-label>
    
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select a Framework"></ark-select-value-text></button></ark-select-trigger>
    <div class="${styles.Indicators}"><ark-select-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-select-clear-trigger><ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator></div>
  </ark-select-control>
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" >
      <ark-select-list class="${styles.List}">
  <ark-select-item-group class="${styles.ItemGroup}" name="frameworks">
    <ark-select-item-group-label class="${styles.ItemGroupLabel}">Frameworks</ark-select-item-group-label>
    
  <ark-select-item class="${styles.Item}" value="react" >
    <ark-select-item-text class="${styles.ItemText}">React</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  <ark-select-item class="${styles.Item}" value="solid" >
    <ark-select-item-text class="${styles.ItemText}">Solid</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  <ark-select-item class="${styles.Item}" value="vue" >
    <ark-select-item-text class="${styles.ItemText}">Vue</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  <ark-select-item class="${styles.Item}" value="svelte" disabled>
    <ark-select-item-text class="${styles.ItemText}">Svelte</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>
  </ark-select-item-group></ark-select-list>
    </ark-select-content>
  </ark-select-positioner>
  </ark-select>
    </div>`
  const el = container.querySelector('ark-select')!
  el.addEventListener('valuechange', (event) => {
    const value = event.detail.value
    el.setAttribute('value', value.join(','))
    container.querySelector('output')!.textContent = `Value: ${JSON.stringify(value)}`
  })
}
