import { createElement, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

const select = (attrs: string, list: string, data = '', lazy = false) => `
  <ark-select class="${styles.Root}" ${attrs}>
    ${data}
    <ark-select-label class="${styles.Label}">Framework</ark-select-label>
    <ark-select-control class="${styles.Control}">
      <ark-select-trigger>
        <button class="${styles.Trigger}">
          <ark-select-value-text class="${styles.ValueText}" placeholder="Select"></ark-select-value-text>
        </button>
      </ark-select-trigger>
      <div class="${styles.Indicators}">
        <ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>
      </div>
    </ark-select-control>
    <ark-select-positioner class="${styles.Positioner}">
      <ark-select-content class="${styles.Content}">
        ${lazy ? '<template>' : ''}<ark-select-list class="${styles.List}">${list}</ark-select-list>${lazy ? '</template>' : ''}
      </ark-select-content>
    </ark-select-positioner>
  </ark-select>`

const item = (value = '', label = '', disabled = false) => `
  <ark-select-item class="${styles.Item}" ${value ? `value="${value}"` : ''} ${disabled ? 'disabled' : ''}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>`

const itemTemplate = `<template>${item()}</template>`

const json = (items: unknown[]) => `<script type="application/json">${JSON.stringify(items)}</script>`

export function mount(root: HTMLElement) {
  root.innerHTML = select(
    `name="framework"`,
    itemTemplate,
    json([
      { value: 'react', label: 'React' },
      { value: 'solid', label: 'Solid' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte', disabled: true },
    ]),
  )
}
