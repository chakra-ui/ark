import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const arrowMarkup = /* html */ `<ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>`

const menu = ({ label, arrow = false }: { label: string; arrow?: boolean }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        ${arrow ? arrowMarkup : ''}
        <ark-menu-list class="${styles.List}">${items.join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const item = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

const fileItems = [
  { value: 'new-file', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
  { value: 'save-as', label: 'Save As...' },
]

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = /* html */ `
  <output>Selected: none</output>
  ${menu({ label: 'File', arrow: true }, fileItems.map(item))}`
  host.querySelector('ark-menu')!.addEventListener('itemselect', (event) => {
    const { value } = event.detail ?? {}
    if (value) host.querySelector('output')!.textContent = `Selected: ${value}`
  })
  root.replaceChildren(host)
}
