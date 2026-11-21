import { createElement, Check, ChevronsUpDown } from 'lucide'

import '@ark-ui/web/select'
import '@ark-ui/web/field'

import field from 'styles/field.module.css'

import styles from 'styles/select.module.css'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const frameworks: Item[] = ['React', 'Solid', 'Vue', 'Svelte'].map((name) => ({ value: name, label: name }))

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = ({ value, label }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}">
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <ark-field class="${field.Root}">
      <ark-select class="${styles.Root}">
        <ark-select-label class="${styles.Label}">Label</ark-select-label>
        <ark-select-control class="${styles.Control}">
          <ark-select-trigger>
            <button class="${styles.Trigger}">
              <ark-select-value-text class="${styles.ValueText}" placeholder="Select a Framework"></ark-select-value-text>
              <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>
            </button>
          </ark-select-trigger>
        </ark-select-control>
        <ark-select-positioner class="${styles.Positioner}">
          <ark-select-content class="${styles.Content}">
            <ark-select-list class="${styles.List}">${frameworks.map(item).join('')}</ark-select-list>
          </ark-select-content>
        </ark-select-positioner>
      </ark-select>
      <ark-field-helper-text class="${field.HelperText}">Additional Info</ark-field-helper-text>
    </ark-field>`
}
