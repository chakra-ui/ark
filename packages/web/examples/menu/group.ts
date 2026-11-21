import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const arrow = `<ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>`

const list = (items: string) => `<ark-menu-list class="${styles.List}">${items}</ark-menu-list>`

const menuMarkup = (label: string, items: string, attrs = '', options: { arrow?: boolean } = {}) => `
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
  `<ark-menu-item class="${styles.Item}" value="${value}" ${extra}>${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = menuMarkup(
    'Edit',
    `<ark-menu-item-group class="${styles.ItemGroup}" name="clipboard">
       <ark-menu-item-group-label class="${styles.ItemGroupLabel}">Clipboard</ark-menu-item-group-label>
       ${item('cut', 'Cut')}${item('copy', 'Copy')}${item('paste', 'Paste', 'disabled')}
     </ark-menu-item-group>
     <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
     <ark-menu-item-group class="${styles.ItemGroup}" name="history">
       <ark-menu-item-group-label class="${styles.ItemGroupLabel}">History</ark-menu-item-group-label>
       ${item('undo', 'Undo')}${item('redo', 'Redo')}
     </ark-menu-item-group>`,
  )
}
