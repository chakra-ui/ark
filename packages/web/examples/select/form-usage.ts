import { createElement, Check, ChevronsUpDown, X } from 'lucide'

import '../../src/components/select/index.js'

import button from 'styles/button.module.css'

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

interface SelectProps {
  label: string
  name: string
  multiple?: boolean
}

const select = ({ label, name, multiple }: SelectProps, children: string[]) => /* html */ `
  <ark-select class="${styles.Root}" name="${name}" ${attr('multiple', multiple)}>
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${children.join('')}
  </ark-select>`

const valueText = ({ placeholder }: { placeholder: string }) => /* html */ `
  <ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const indicator = () => /* html */ `
  <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>`

const control = ({ placeholder }: { placeholder: string }) => /* html */ `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger>
      <button class="${styles.Trigger}">${valueText({ placeholder })}</button>
    </ark-select-trigger>
    <div class="${styles.Indicators}">
      <ark-select-clear-trigger><button class="${styles.ClearTrigger}">${icon(X)}</button></ark-select-clear-trigger>
      ${indicator()}
    </div>
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

const item = ({ value, label, disabled }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}" ${attr('disabled', disabled)}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <form class="stack">
      ${select({ label: 'Framework', name: 'framework', multiple: true }, [
        control({ placeholder: 'Select' }),
        content([list([itemGroup({ label: 'Frameworks' }, frameworks.map(item))])]),
      ])}
      <button class="${button.Root}" type="submit">Submit</button>
      <output>Submitted: none</output>
    </form>`
  container.querySelector('form')!.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    container.querySelector('output')!.textContent = `Submitted: ${JSON.stringify(data.getAll('framework'))}`
  })
}
