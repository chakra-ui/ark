import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const arrow = /* html */ `<ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>`

const list = (items: string) => /* html */ `<ark-menu-list class="${styles.List}">${items}</ark-menu-list>`

const menuMarkup = (label: string, items: string, attrs = '', options: { arrow?: boolean } = {}) => /* html */ `
  <ark-menu ${attrs}>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">${options.arrow ? arrow : ''}${list(items)}</ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const item = (value: string, label: string, extra = '') =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}" ${extra}>${label}</ark-menu-item>`

const Basic = () =>
  menuMarkup(
    'File',
    `${item('new-file', 'New File')}${item('open', 'Open...')}${item('save', 'Save')}${item('save-as', 'Save As...')}`,
    '',
    { arrow: true },
  )

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = /* html */ `<output>Selected: none</output>${Basic()}`
  host.querySelector('ark-menu')!.addEventListener('itemselect', (event) => {
    const { value } = event.detail ?? {}
    if (value) host.querySelector('output')!.textContent = `Selected: ${value}`
  })
  root.replaceChildren(host)
}
