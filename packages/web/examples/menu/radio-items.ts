import { createElement, ChevronDown, Check } from 'lucide'

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

const option = (tag: string, className: string, value: string, label: string, extra = '') => `
  <${tag} class="${className}" value="${value}" ${extra}>
    <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
    <ark-menu-item-text class="${styles.ItemText}">${label}</ark-menu-item-text>
  </${tag}>`

export function mount(root: HTMLElement) {
  root.innerHTML = menuMarkup(
    'Sort',
    `<ark-menu-radio-item-group class="${styles.ItemGroup}" name="sort" value="date">
       <ark-menu-item-group-label class="${styles.ItemGroupLabel}">Sort By</ark-menu-item-group-label>
       ${option('ark-menu-radio-item', styles.RadioItem, 'name', 'Name')}
       ${option('ark-menu-radio-item', styles.RadioItem, 'date', 'Date Modified')}
       ${option('ark-menu-radio-item', styles.RadioItem, 'size', 'Size')}
     </ark-menu-radio-item-group>`,
  )
}
