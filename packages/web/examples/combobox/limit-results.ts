import { createElement, ChevronsUpDown, Check } from 'lucide'

import '@ark-ui/web/combobox'

import styles from 'styles/combobox.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) => /* html */ `
  <ark-combobox-item class="${styles.Item}" value="${value}">
    <ark-combobox-item-text class="${styles.ItemText}">${label}</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>`

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
  'Charlotte',
  'San Francisco',
  'Indianapolis',
  'Seattle',
  'Denver',
  'Boston',
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-combobox class="${styles.Root}" limit="5">
      <ark-combobox-label class="${styles.Label}">City</ark-combobox-label>
      <ark-combobox-control class="${styles.Control}">
        <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. New York" /></ark-combobox-input>
        <div class="${styles.Indicators}">
          <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
        </div>
      </ark-combobox-control>
      <ark-combobox-positioner class="${styles.Positioner}">
        <ark-combobox-content class="${styles.Content}">
          <ark-combobox-list class="${styles.List}">${cities.map((label) => item({ label, value: label.toLowerCase().replace(' ', '-') })).join('')}</ark-combobox-list>
        </ark-combobox-content>
      </ark-combobox-positioner>
    </ark-combobox>`
}
