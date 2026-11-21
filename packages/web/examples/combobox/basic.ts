import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}" >
    
    <ark-combobox-label class="${styles.Label}">Favorite Fruit</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Apple" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <ark-combobox-empty class="${styles.Empty}">No results found</ark-combobox-empty>
        <ark-combobox-list class="${styles.List}">
  <ark-combobox-item class="${styles.Item}" value="apple">
    <ark-combobox-item-text class="${styles.ItemText}">Apple</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>
  <ark-combobox-item class="${styles.Item}" value="banana">
    <ark-combobox-item-text class="${styles.ItemText}">Banana</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>
  <ark-combobox-item class="${styles.Item}" value="orange">
    <ark-combobox-item-text class="${styles.ItemText}">Orange</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>
  <ark-combobox-item class="${styles.Item}" value="mango">
    <ark-combobox-item-text class="${styles.ItemText}">Mango</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>
  <ark-combobox-item class="${styles.Item}" value="pineapple">
    <ark-combobox-item-text class="${styles.ItemText}">Pineapple</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>
  <ark-combobox-item class="${styles.Item}" value="strawberry">
    <ark-combobox-item-text class="${styles.ItemText}">Strawberry</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item></ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`
}
