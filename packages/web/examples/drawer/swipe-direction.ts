import { createElement, X } from 'lucide'

import '../../src/components/drawer/index.js'

import styles from 'styles/drawer.module.css'

const closeIcon = createElement(X, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-drawer swipe-direction="end">
    <ark-drawer-trigger><button class="${styles.Trigger}">Open Right</button></ark-drawer-trigger>
    <ark-drawer-backdrop class="${styles.Backdrop}"></ark-drawer-backdrop>
    <ark-drawer-positioner class="${styles.Positioner}">
      <ark-drawer-content class="${styles.Content}">
        <ark-drawer-title class="${styles.Title}">Right Drawer</ark-drawer-title>
        <p>This drawer slides in from the right side.</p>
        <ark-drawer-close-trigger><button class="${styles.CloseTrigger}" aria-label="Close">${closeIcon}</button></ark-drawer-close-trigger>
      </ark-drawer-content>
    </ark-drawer-positioner>
  </ark-drawer>`
}
