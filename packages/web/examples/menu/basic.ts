import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu >
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        File
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}"><ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow><ark-menu-list class="${styles.List}"><ark-menu-item class="${styles.Item}" value="new-file" >New File</ark-menu-item><ark-menu-item class="${styles.Item}" value="open" >Open...</ark-menu-item><ark-menu-item class="${styles.Item}" value="save" >Save</ark-menu-item><ark-menu-item class="${styles.Item}" value="save-as" >Save As...</ark-menu-item></ark-menu-list></ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
