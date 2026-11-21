import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const combobox = (
  label: string,
  placeholder: string,
  list: string,
  { attrs = '', data = '', clear = true, empty = false } = {},
) => /* html */ `
  <ark-combobox class="${styles.Root}" ${attrs}>
    ${data}
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
        ${empty ? /* html */ `<ark-combobox-empty><div class="${styles.Empty}">No results found</div></ark-combobox-empty>` : ''}
        <ark-combobox-list class="${styles.List}">${list}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

const resources = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stackoverflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
  { label: 'React', href: 'https://react.dev', value: 'react' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = combobox(
    'Developer Resources',
    'e.g. GitHub',
    resources
      .map(
        (it) => /* html */ `
        <ark-combobox-item value="${it.value}">
          <a class="${styles.Item}" href="${it.href}">
            <ark-combobox-item-text class="${styles.ItemText}">${it.label}</ark-combobox-item-text>
            <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
          </a>
        </ark-combobox-item>`,
      )
      .join(''),
    { attrs: 'selection-behavior="preserve"', clear: false },
  )
}
