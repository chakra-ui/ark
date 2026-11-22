import { createElement, ChevronDown } from 'lucide'

import '@ark-ui/web/menu'

import styles from 'styles/menu.module.css'

interface Item {
  value: string
  label: string
}

const menu = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-list class="${styles.List}">${items.join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const item = ({ value, label }: Item) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

const fileItems: Item[] = [
  { value: 'new', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
]

const editItems: Item[] = [
  { value: 'undo', label: 'Undo' },
  { value: 'redo', label: 'Redo' },
  { value: 'cut', label: 'Cut' },
  { value: 'copy', label: 'Copy' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div style="display: flex; gap: 0.5rem">
    ${menu({ label: 'File' }, fileItems.map(item))}
    ${menu({ label: 'Edit' }, editItems.map(item))}
  </div>`
}
