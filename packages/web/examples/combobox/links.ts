import { createElement, ChevronsUpDown, Check } from 'lucide'

import '@ark-ui/web/combobox'

import styles from 'styles/combobox.module.css'

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
  root.innerHTML = /* html */ `
    <ark-combobox class="${styles.Root}" selection-behavior="preserve">
      <ark-combobox-label class="${styles.Label}">Developer Resources</ark-combobox-label>
      <ark-combobox-control class="${styles.Control}">
        <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. GitHub" /></ark-combobox-input>
        <div class="${styles.Indicators}">
          <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
        </div>
      </ark-combobox-control>
      <ark-combobox-positioner class="${styles.Positioner}">
        <ark-combobox-content class="${styles.Content}">
          <ark-combobox-list class="${styles.List}">${resources.map((resource) => link(resource)).join('')}</ark-combobox-list>
        </ark-combobox-content>
      </ark-combobox-positioner>
    </ark-combobox>`
}
