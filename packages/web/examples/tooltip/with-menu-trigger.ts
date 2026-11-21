import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import '../../src/components/tooltip/index.js'

import menu from 'styles/menu.module.css'

import styles from 'styles/tooltip.module.css'

const menuTrigger = `
  <ark-menu-trigger>
    <button class="${menu.Trigger}">File<ark-menu-indicator class="${menu.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
  </ark-menu-trigger>`

const tooltipPopup = (content: string) => `
  <ark-tooltip-positioner class="${styles.Positioner}">
    <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
  </ark-tooltip-positioner>`

const menuPopup = (items: string) => `
  <ark-menu-positioner class="${menu.Positioner}">
    <ark-menu-content class="${menu.Content}">
      <ark-menu-arrow class="${menu.Arrow}"><ark-menu-arrow-tip class="${menu.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>
      <ark-menu-list class="${menu.List}">${items}</ark-menu-list>
    </ark-menu-content>
  </ark-menu-positioner>`

const menuItem = (value: string, label: string, attrs = '') =>
  `<ark-menu-item class="${menu.Item}" value="${value}" ${attrs}>${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu>
    <ark-tooltip>
      <ark-tooltip-trigger>${menuTrigger}</ark-tooltip-trigger>
      ${tooltipPopup('Open the file menu')}
    </ark-tooltip>
    ${menuPopup(`${menuItem('new-file', 'New File')}${menuItem('open', 'Open...')}${menuItem('save', 'Save')}${menuItem('save-as', 'Save As...')}`)}
  </ark-menu>`
}
