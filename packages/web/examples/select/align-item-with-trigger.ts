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

const attr = (name: string, on?: boolean) => (on ? name : '')

interface SelectProps {
  label: string
  defaultValue: string
  alignItemWithTrigger?: boolean
}

const select = ({ label, defaultValue, alignItemWithTrigger }: SelectProps, children: string[]) => /* html */ `
  <ark-select class="${styles.Root}" ${attr('align-item-with-trigger', alignItemWithTrigger)} default-value="${defaultValue}">
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

const scrollArrow = ({ placement }: { placement: 'top' | 'bottom' }) => /* html */ `
  <ark-select-scroll-arrow class="${styles.ScrollArrow}" placement="${placement}">${icon(placement === 'top' ? ChevronUp : ChevronDown)}</ark-select-scroll-arrow>`

const list = (children: string[]) => /* html */ `
  <ark-select-list class="${styles.List}">${children.join('')}</ark-select-list>`

const item = ({ value, label }: Item) => /* html */ `
  <ark-select-item class="${styles.Item}" value="${value}">
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = select({ label: 'Framework', defaultValue: 'solid', alignItemWithTrigger: true }, [
    control({ placeholder: 'Select' }),
    content([scrollArrow({ placement: 'top' }), list(frameworks.map(item)), scrollArrow({ placement: 'bottom' })]),
  ])
}
