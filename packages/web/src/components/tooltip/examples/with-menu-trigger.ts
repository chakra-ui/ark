import { createElement, ChevronDown } from 'lucide'

import '@ark-ui/web/menu'

import '@ark-ui/web/tooltip'

import menu from 'styles/menu.module.css'

import styles from 'styles/tooltip.module.css'

interface MenuItemProps {
  value: string
  label: string
}

const menuItem = ({ value, label }: MenuItemProps) =>
  /* html */ `<ark-menu-item class="${menu.Item}" value="${value}">${label}</ark-menu-item>`

const items: MenuItemProps[] = [
  { value: 'new-file', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
  { value: 'save-as', label: 'Save As...' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu>
    <ark-tooltip>
      <ark-tooltip-trigger>
        <ark-menu-trigger>
          <button class="${menu.Trigger}">File<ark-menu-indicator class="${menu.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
        </ark-menu-trigger>
      </ark-tooltip-trigger>
      <ark-tooltip-positioner class="${styles.Positioner}">
        <ark-tooltip-content class="${styles.Content}">Open the file menu</ark-tooltip-content>
      </ark-tooltip-positioner>
    </ark-tooltip>
    <ark-menu-positioner class="${menu.Positioner}">
      <ark-menu-content class="${menu.Content}">
        <ark-menu-arrow class="${menu.Arrow}"><ark-menu-arrow-tip class="${menu.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>
        <ark-menu-list class="${menu.List}">${items.map(menuItem).join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
