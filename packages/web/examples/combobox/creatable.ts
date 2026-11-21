import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const NEW_OPTION_VALUE = '[[new]]'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}" value="" allow-custom-value>
    
    <ark-combobox-label class="${styles.Label}">Label</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Bug" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
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
  let items = [
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' },
    { label: 'Enhancement', value: 'enhancement' },
    { label: 'Documentation', value: 'docs' },
  ]
  let inputValue = ''
  const show = (next: typeof items) => {
    el.collection = createListCollection({ items: next })
  }
  show(items)
  el.addEventListener('inputvaluechange', (event) => {
    const detail = event.detail
    if (detail.reason !== 'input-change') return
    inputValue = detail.inputValue
    const query = inputValue.trim().toLowerCase()
    const exists = items.some((it) => it.label.toLowerCase() === query)
    show(query && !exists ? [...items, { label: `+ Create "${inputValue}"`, value: NEW_OPTION_VALUE }] : items)
  })
  el.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    if (value.includes(NEW_OPTION_VALUE)) {
      items = [...items, { label: inputValue, value: inputValue }]
      show(items)
    }
    el.setAttribute('value', value.map((v) => (v === NEW_OPTION_VALUE ? inputValue : v)).join(','))
  })
}
