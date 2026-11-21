import { createElement, Check, ChevronsUpDown } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const frameworks: Item[] = ['React', 'Solid', 'Vue', 'Svelte'].map((name) => ({ value: name, label: name }))

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const select = ({ label }: { label: string }, children: string[]) => /* html */ `
  <ark-select class="${styles.Root}" >
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${children.join('')}
  </ark-select>`

const valueText = ({ placeholder }: { placeholder: string }) => /* html */ `
  <ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const indicator = () => /* html */ `
  <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>`

const control = ({ placeholder, clearable = false }: { placeholder: string; clearable?: boolean }) => /* html */ `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger>
      <button class="${styles.Trigger}">${valueText({ placeholder })}${indicator()}</button>
    </ark-select-trigger>
    ${clearable ? /* html */ `<ark-select-clear-trigger><button class="${styles.ClearTrigger}">Clear</button></ark-select-clear-trigger>` : ''}
  </ark-select-control>`

const content = (children: string[]) => /* html */ `
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}">
      ${children.join('')}
    </ark-select-content>
  </ark-select-positioner>`

const list = (children: string[]) => /* html */ `
  <ark-select-list class="${styles.List}">${children.join('')}</ark-select-list>`

const itemGroup = ({ label }: { label: string }, children: string[]) => /* html */ `
  <ark-select-item-group class="${styles.ItemGroup}" name="${label.toLowerCase()}">
    <ark-select-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-select-item-group-label>
    ${children.join('')}
  </ark-select-item-group>`

const item = ({ value, label }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}">
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = select({ label: 'Framework' }, [
    control({ placeholder: 'Select a Framework', clearable: true }),
    content([list([itemGroup({ label: 'Frameworks' }, frameworks.map(item))])]),
  ])
  const el = container.querySelector('ark-select')!
  el.addEventListener('highlightchange', (event) => {
    const { highlightedValue } = event.detail
    if (highlightedValue) el.api?.selectValue(highlightedValue)
  })
}
