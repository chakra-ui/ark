import { createElement, X, ChevronDown } from 'lucide'

import '../../src/components/dialog/index.js'

import '../../src/components/menu/index.js'

import button from 'styles/button.module.css'

import dialog from 'styles/dialog.module.css'

import styles from 'styles/menu.module.css'

const item = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${dialog.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${dialog.Positioner}">
      <ark-dialog-content class="${dialog.Content}">
        <ark-dialog-title class="${dialog.Title}">Settings</ark-dialog-title>
        <ark-dialog-description class="${dialog.Description}">Configure your preferences below.</ark-dialog-description>
        <ark-dialog-close-trigger><button class="${dialog.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <div class="${dialog.Body}">
          <ark-menu unmount-on-exit>
            <ark-menu-trigger>
              <button class="${styles.Trigger}">Select theme<ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
            </ark-menu-trigger>
            <ark-menu-positioner class="${styles.Positioner}">
              <ark-menu-content class="${styles.Content}">
                <template>
                  <ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>
                  <ark-menu-list class="${styles.List}">${themes.map(item).join('')}</ark-menu-list>
                </template>
              </ark-menu-content>
            </ark-menu-positioner>
          </ark-menu>
        </div>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
