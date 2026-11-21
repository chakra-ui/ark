import { createElement, Check, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const frameworks: Item[] = [
  { value: 'angular', label: 'Angular' },
  { value: 'ember', label: 'Ember' },
  { value: 'lit', label: 'Lit' },
  { value: 'preact', label: 'Preact' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
]

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const scrollArrow = ({ placement }: { placement: 'top' | 'bottom' }) => /* html */ `
  <ark-select-scroll-arrow class="${styles.ScrollArrow}" placement="${placement}">${icon(placement === 'top' ? ChevronUp : ChevronDown)}</ark-select-scroll-arrow>`

const item = ({ value, label }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}">
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <ark-select class="${styles.Root}" align-item-with-trigger default-value="solid">
      <ark-select-label class="${styles.Label}">Framework</ark-select-label>
      <ark-select-control class="${styles.Control}">
        <ark-select-trigger>
          <button class="${styles.Trigger}">
            <ark-select-value-text class="${styles.ValueText}" placeholder="Select"></ark-select-value-text>
            <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>
          </button>
        </ark-select-trigger>
      </ark-select-control>
      <ark-select-positioner class="${styles.Positioner}">
        <ark-select-content class="${styles.Content}">
          ${scrollArrow({ placement: 'top' })}
          <ark-select-list class="${styles.List}">${frameworks.map(item).join('')}</ark-select-list>
          ${scrollArrow({ placement: 'bottom' })}
        </ark-select-content>
      </ark-select-positioner>
    </ark-select>`
}
