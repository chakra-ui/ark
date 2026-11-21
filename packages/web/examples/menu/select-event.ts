import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

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
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        File
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>
        <ark-menu-list class="${styles.List}">${fileItems.map(item).join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
  host.querySelector('ark-menu')!.addEventListener('itemselect', (event) => {
    const { value } = event.detail ?? {}
    if (value) host.querySelector('output')!.textContent = `Selected: ${value}`
  })
  root.replaceChildren(host)
}
