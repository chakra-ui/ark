import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import '../../src/components/tooltip/index.js'

import menu from 'styles/menu.module.css'

import styles from 'styles/tooltip.module.css'

interface MenuItemProps {
  value: string
  label: string
  disabled?: boolean
}

const attr = (name: string, on?: boolean) => (on ? name : '')

const menuItem = ({ value, label, disabled = false }: MenuItemProps) =>
  /* html */ `<ark-menu-item class="${menu.Item}" value="${value}" ${attr('disabled', disabled)}>${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button class="${menu.Trigger}">File<ark-menu-indicator class="${menu.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${menu.Positioner}">
      <ark-menu-content class="${menu.Content}">
        <ark-menu-arrow class="${menu.Arrow}"><ark-menu-arrow-tip class="${menu.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>
        <ark-menu-list class="${menu.List}">
          ${menuItem({ value: 'new-file', label: 'New File' })}
          ${menuItem({ value: 'open', label: 'Open...' })}
          <ark-tooltip>
            <ark-tooltip-trigger>${menuItem({ value: 'save', label: 'Save', disabled: true })}</ark-tooltip-trigger>
            <ark-tooltip-positioner class="${styles.Positioner}">
              <ark-tooltip-content class="${styles.Content}">No changes to save</ark-tooltip-content>
            </ark-tooltip-positioner>
          </ark-tooltip>
          ${menuItem({ value: 'save-as', label: 'Save As...' })}
        </ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
