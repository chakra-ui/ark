import { createElement, Check, ChevronsUpDown, X } from 'lucide'

import '@ark-ui/web/select'

import styles from 'styles/select.module.css'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const frameworks: Item[] = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
]

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const attr = (name: string, on?: boolean) => (on ? name : '')

const item = ({ value, label, disabled }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}" ${attr('disabled', disabled)}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <div class="stack">
      <output>Value: []</output>
      <ark-select class="${styles.Root}" value="">
        <ark-select-label class="${styles.Label}">Framework</ark-select-label>
        <ark-select-control class="${styles.Control}">
          <ark-select-trigger>
            <button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select a Framework"></ark-select-value-text></button>
          </ark-select-trigger>
          <div class="${styles.Indicators}">
            <ark-select-clear-trigger><button class="${styles.ClearTrigger}">${icon(X)}</button></ark-select-clear-trigger>
            <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>
          </div>
        </ark-select-control>
        <ark-select-positioner class="${styles.Positioner}">
          <ark-select-content class="${styles.Content}">
            <ark-select-list class="${styles.List}">
              <ark-select-item-group class="${styles.ItemGroup}" name="frameworks">
                <ark-select-item-group-label class="${styles.ItemGroupLabel}">Frameworks</ark-select-item-group-label>
                ${frameworks.map(item).join('')}
              </ark-select-item-group>
            </ark-select-list>
          </ark-select-content>
        </ark-select-positioner>
      </ark-select>
    </div>`
  const el = container.querySelector('ark-select')!
  el.addEventListener('valuechange', (event) => {
    const value = event.detail.value
    el.setAttribute('value', value.join(','))
    container.querySelector('output')!.textContent = `Value: ${JSON.stringify(value)}`
  })
}
