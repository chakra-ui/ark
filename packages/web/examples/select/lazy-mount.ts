import { createElement, Check, ChevronsUpDown } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

interface JsonItem {
  value: string
  label: string
  disabled?: boolean
  group?: string
}

const items: JsonItem[] = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
]

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-select class="${styles.Root}" name="framework" unmount-on-exit>
      <script type="application/json">${JSON.stringify(items)}</script>
      <ark-select-label class="${styles.Label}">Framework</ark-select-label>
      <ark-select-control class="${styles.Control}">
        <ark-select-trigger>
          <button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select"></ark-select-value-text></button>
        </ark-select-trigger>
        <div class="${styles.Indicators}"><ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator></div>
      </ark-select-control>
      <ark-select-positioner class="${styles.Positioner}">
        <ark-select-content class="${styles.Content}">
          <template>
            <ark-select-list class="${styles.List}">
              <template>
                <ark-select-item class="${styles.Item}">
                  <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
                  <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
                </ark-select-item>
              </template>
            </ark-select-list>
          </template>
        </ark-select-content>
      </ark-select-positioner>
    </ark-select>`
}
