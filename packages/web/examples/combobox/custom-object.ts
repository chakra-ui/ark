import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const combobox = (
  label: string,
  placeholder: string,
  list: string,
  { attrs = '', data = '', clear = true, empty = false } = {},
) => `
  <ark-combobox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-combobox-label class="${styles.Label}">${label}</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="${placeholder}" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        ${clear ? `<ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>` : ''}
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        ${empty ? `<ark-combobox-empty><div class="${styles.Empty}">No results found</div></ark-combobox-empty>` : ''}
        <ark-combobox-list class="${styles.List}">${list}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

const countries = [
  { country: 'United States', code: 'US', flag: '🇺🇸' },
  { country: 'Canada', code: 'CA', flag: '🇨🇦' },
  { country: 'Australia', code: 'AU', flag: '🇦🇺' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = combobox(
    'Country',
    'e.g. Canada',
    countries
      .map(
        (it) => `
        <ark-combobox-item class="${styles.Item}" value="${it.code}">
          <span aria-hidden="true">${it.flag}</span>
          <ark-combobox-item-text class="${styles.ItemText}">${it.country}</ark-combobox-item-text>
          <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
        </ark-combobox-item>`,
      )
      .join(''),
  )
}
