import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

interface ComboboxProps {
  label: string
  placeholder: string
  clear?: boolean
  selectionBehavior: 'clear' | 'replace' | 'preserve'
}

const combobox = (
  { label, placeholder, clear = true, selectionBehavior }: ComboboxProps,
  children: string[],
) => /* html */ `
  <ark-combobox class="${styles.Root}" selection-behavior="${selectionBehavior}">
    <ark-combobox-label class="${styles.Label}">${label}</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="${placeholder}" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        ${clear ? /* html */ `<ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>` : ''}
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <ark-combobox-list class="${styles.List}">${children.join('')}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

interface Resource {
  label: string
  href: string
  value: string
}

const resources: Resource[] = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stackoverflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
  { label: 'React', href: 'https://react.dev', value: 'react' },
]

const link = ({ label, href, value }: Resource) => /* html */ `
  <ark-combobox-item value="${value}">
    <a class="${styles.Item}" href="${href}">
      <ark-combobox-item-text class="${styles.ItemText}">${label}</ark-combobox-item-text>
      <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
    </a>
  </ark-combobox-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = combobox(
    {
      label: 'Developer Resources',
      placeholder: 'e.g. GitHub',
      selectionBehavior: 'preserve',
      clear: false,
    },
    resources.map((resource) => link(resource)),
  )
}
