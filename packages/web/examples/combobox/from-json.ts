import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const comboboxMarkup = (attrs: string, list: string, data = '') => `
  <ark-combobox class="${styles.Root}" ${attrs}>
    ${data}
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
        <ark-combobox-list class="${styles.List}">${list}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

const item = (value = '', label = '') => `
  <ark-combobox-item class="${styles.Item}" ${value ? `value="${value}"` : ''}>
    <ark-combobox-item-text class="${styles.ItemText}">${label}</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>`

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = comboboxMarkup(
    `filter="starts-with"`,
    `<template>${item()}</template>`,
    `<script type="application/json">${JSON.stringify(fruits)}</script>`,
  )
}
