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

export function mount(root: HTMLElement) {
  root.innerHTML = menuMarkup(
    'Help',
    /* html */ `<ark-menu-item value="docs"><a class="${styles.Item}" href="https://ark-ui.com">Documentation</a></ark-menu-item>
     <ark-menu-item value="github"><a class="${styles.Item}" href="https://github.com/chakra-ui/ark">GitHub</a></ark-menu-item>
     <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
     <ark-menu-item value="changelog"><a class="${styles.Item}" href="https://github.com/chakra-ui/ark/releases">Changelog</a></ark-menu-item>`,
  )
}
