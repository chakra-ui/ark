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

const menuTrigger = /* html */ `
  <ark-menu-trigger>
    <button class="${menu.Trigger}">File<ark-menu-indicator class="${menu.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
  </ark-menu-trigger>`

const menuPopup = (items: string[]) => /* html */ `
  <ark-menu-positioner class="${menu.Positioner}">
    <ark-menu-content class="${menu.Content}">
      <ark-menu-arrow class="${menu.Arrow}"><ark-menu-arrow-tip class="${menu.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>
      <ark-menu-list class="${menu.List}">${items.join('')}</ark-menu-list>
    </ark-menu-content>
  </ark-menu-positioner>`

const menuItem = ({ value, label, disabled = false }: MenuItemProps) =>
  /* html */ `<ark-menu-item class="${menu.Item}" value="${value}" ${attr('disabled', disabled)}>${label}</ark-menu-item>`

const tooltipPopup = (content: string) => /* html */ `
  <ark-tooltip-positioner class="${styles.Positioner}">
    <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
  </ark-tooltip-positioner>`

const withTooltip = ({ content }: { content: string }, trigger: string) => /* html */ `
  <ark-tooltip>
    <ark-tooltip-trigger>${trigger}</ark-tooltip-trigger>
    ${tooltipPopup(content)}
  </ark-tooltip>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu>
    ${menuTrigger}
    ${menuPopup([
      menuItem({ value: 'new-file', label: 'New File' }),
      menuItem({ value: 'open', label: 'Open...' }),
      withTooltip({ content: 'No changes to save' }, menuItem({ value: 'save', label: 'Save', disabled: true })),
      menuItem({ value: 'save-as', label: 'Save As...' }),
    ])}
  </ark-menu>`
}
