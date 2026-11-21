import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '@ark-ui/web/combobox'

import styles from 'styles/combobox.module.css'

interface Country {
  country: string
  code: string
  flag: string
}

const countries: Country[] = [
  { country: 'United States', code: 'US', flag: '🇺🇸' },
  { country: 'Canada', code: 'CA', flag: '🇨🇦' },
  { country: 'Australia', code: 'AU', flag: '🇦🇺' },
]

const countryItem = ({ country, code, flag }: Country) => /* html */ `
  <ark-combobox-item class="${styles.Item}" value="${code}">
    <span aria-hidden="true">${flag}</span>
    <ark-combobox-item-text class="${styles.ItemText}">${country}</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}">
    <ark-combobox-label class="${styles.Label}">Country</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Canada" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <ark-combobox-list class="${styles.List}">${countries.map((country) => countryItem(country)).join('')}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`
}
