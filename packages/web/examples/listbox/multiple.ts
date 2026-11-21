import { createElement, Check } from 'lucide'

import '@ark-ui/web/listbox'

import styles from 'styles/listbox.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}" selection-mode="multiple" default-value="ts">
    <script type="application/json">${JSON.stringify([
      { value: 'ts', label: 'TypeScript' },
      { value: 'go', label: 'Go' },
      { value: 'rs', label: 'Rust' },
    ])}</script>
    <ark-listbox-label class="${styles.Label}">Languages</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">
        <template>
          <ark-listbox-item class="${styles.Item}">
            <ark-listbox-item-text class="${styles.ItemText}"></ark-listbox-item-text>
            <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
          </ark-listbox-item>
        </template>
      </ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}
