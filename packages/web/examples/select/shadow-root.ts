import { createElement, Check, ChevronsUpDown } from 'lucide'

import '../../src/components/select/index.js'

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

function inShadowRoot(markup: string, setup?: (root: ShadowRoot) => void) {
  const host = document.createElement('div')
  const root = host.attachShadow({ mode: 'open' })
  for (const style of document.head.querySelectorAll('style, link[rel=stylesheet]')) root.append(style.cloneNode(true))
  const template = document.createElement('template')
  template.innerHTML = markup
  root.append(template.content)
  setup?.(root)
  return host
}

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const attr = (name: string, on?: boolean) => (on ? name : '')

const item = ({ value, label, disabled }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}" ${attr('disabled', disabled)}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.replaceChildren(
    inShadowRoot(/* html */ `
      <ark-select class="${styles.Root}" name="framework" default-value="vue">
        <ark-select-label class="${styles.Label}">Framework</ark-select-label>
        <ark-select-control class="${styles.Control}">
          <ark-select-trigger>
            <button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select"></ark-select-value-text></button>
          </ark-select-trigger>
          <div class="${styles.Indicators}"><ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator></div>
        </ark-select-control>
        <ark-select-positioner class="${styles.Positioner}">
          <ark-select-content class="${styles.Content}">
            <ark-select-list class="${styles.List}">${frameworks.map(item).join('')}</ark-select-list>
          </ark-select-content>
        </ark-select-positioner>
      </ark-select>`),
  )
}
