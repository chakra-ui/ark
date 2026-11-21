import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const listbox = (attrs: string, label: string, list: string, data = '') => /* html */ `
  <ark-listbox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${list}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

const item = (value = '', label = '') => /* html */ `
  <ark-listbox-item class="${styles.Item}" ${value ? `value="${value}"` : ''}>
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

const json = (items: unknown[]) => /* html */ `<script type="application/json">${JSON.stringify(items)}</script>`

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    `selection-mode="multiple" default-value="ts"`,
    'Languages',
    /* html */ `<template>${item()}</template>`,
    json([
      { value: 'ts', label: 'TypeScript' },
      { value: 'go', label: 'Go' },
      { value: 'rs', label: 'Rust' },
    ]),
  )
}
