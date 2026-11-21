import { createElement, ChevronDown, Check } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

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

interface CheckboxItemProps {
  value: string
  label: string
  checked?: boolean
}

const checkboxItem = ({ value, label, checked = false }: CheckboxItemProps) => /* html */ `
  <ark-menu-checkbox-item class="${styles.CheckboxItem}" value="${value}" ${attr('checked', checked)}>
    <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
    <ark-menu-item-text class="${styles.ItemText}">${label}</ark-menu-item-text>
  </ark-menu-checkbox-item>`

const options: CheckboxItemProps[] = [
  { value: 'status-bar', label: 'Status Bar', checked: true },
  { value: 'activity-bar', label: 'Activity Bar' },
  { value: 'panel', label: 'Panel' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = menu({ label: 'View' }, options.map(checkboxItem))
}
