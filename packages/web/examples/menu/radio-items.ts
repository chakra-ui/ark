import { createElement, ChevronDown, Check } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

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

const radioGroup = (
  { name, value, label }: { name: string; value: string; label: string },
  items: string[],
) => /* html */ `
  <ark-menu-radio-item-group class="${styles.ItemGroup}" name="${name}" value="${value}">
    <ark-menu-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-menu-item-group-label>
    ${items.join('')}
  </ark-menu-radio-item-group>`

const radioItem = ({ value, label }: { value: string; label: string }) => /* html */ `
  <ark-menu-radio-item class="${styles.RadioItem}" value="${value}">
    <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
    <ark-menu-item-text class="${styles.ItemText}">${label}</ark-menu-item-text>
  </ark-menu-radio-item>`

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'date', label: 'Date Modified' },
  { value: 'size', label: 'Size' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = menu({ label: 'Sort' }, [
    radioGroup({ name: 'sort', value: 'date', label: 'Sort By' }, sortOptions.map(radioItem)),
  ])
}
