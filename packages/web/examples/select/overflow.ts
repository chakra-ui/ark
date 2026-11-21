import { createElement, Check, ChevronsUpDown } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const names: Item[] = Array.from({ length: 14 }, (_, i) => ({ value: `Name ${i + 1}`, label: `Name ${i + 1}` }))

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = ({ value, label }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}">
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <ark-select class="${styles.Root}" fit-viewport placement="bottom-start" same-width>
      <ark-select-label class="${styles.Label}">Framework</ark-select-label>
      <ark-select-control class="${styles.Control}">
        <ark-select-trigger>
          <button class="${styles.Trigger}">
            <ark-select-value-text class="${styles.ValueText}" placeholder="Select a Framework"></ark-select-value-text>
            <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>
          </button>
        </ark-select-trigger>
        <ark-select-clear-trigger><button class="${styles.ClearTrigger}">Clear</button></ark-select-clear-trigger>
      </ark-select-control>
      <ark-select-positioner class="${styles.Positioner}">
        <ark-select-content class="${styles.Content}" style="max-height: 200px">
          <ark-select-list class="${styles.List}">
            <ark-select-item-group class="${styles.ItemGroup}" name="names">
              <ark-select-item-group-label class="${styles.ItemGroupLabel}">Names</ark-select-item-group-label>
              ${names.map(item).join('')}
            </ark-select-item-group>
          </ark-select-list>
        </ark-select-content>
      </ark-select-positioner>
    </ark-select>`
}
