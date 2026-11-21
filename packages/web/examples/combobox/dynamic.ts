import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/combobox'

import styles from 'styles/combobox.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}" filter="none">
    
    <ark-combobox-label class="${styles.Label}">Email</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. john" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        
        <ark-combobox-list class="${styles.List}"><template>
  <ark-combobox-item class="${styles.Item}" >
    <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item></template></ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`
  const el = root.querySelector('ark-combobox')!
  el.collection = createListCollection<string>({ items: [] })
  el.addEventListener('inputvaluechange', (event) => {
    const { inputValue, reason } = event.detail
    if (reason !== 'input-change') return
    el.collection = createListCollection({
      items: ['gmail.com', 'yahoo.com', 'ark-ui.com'].map((domain) => `${inputValue}@${domain}`),
    })
  })
}
