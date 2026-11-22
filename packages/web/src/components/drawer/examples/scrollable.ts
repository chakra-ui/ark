import { createElement, X } from 'lucide'

import '@ark-ui/web/drawer'

import styles from 'styles/drawer.module.css'

const closeIcon = createElement(X, { 'aria-hidden': 'true' }).outerHTML

const items = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-drawer>
    <ark-drawer-trigger><button class="${styles.Trigger}">Open</button></ark-drawer-trigger>
    <ark-drawer-backdrop class="${styles.Backdrop}"></ark-drawer-backdrop>
    <ark-drawer-positioner class="${styles.Positioner}">
      <ark-drawer-content class="${styles.Content}">
        <ark-drawer-grabber class="${styles.Grabber}">
          <ark-drawer-grabber-indicator class="${styles.GrabberIndicator}"></ark-drawer-grabber-indicator>
        </ark-drawer-grabber>
        <ark-drawer-title class="${styles.Title}">Scrollable Drawer</ark-drawer-title>
        <ark-drawer-close-trigger><button class="${styles.CloseTrigger}" aria-label="Close">${closeIcon}</button></ark-drawer-close-trigger>
        <div class="${styles.Scrollable}">
          ${items.map((item) => /* html */ `<div class="${styles.ScrollableItem}">${item}</div>`).join('')}
        </div>
      </ark-drawer-content>
    </ark-drawer-positioner>
  </ark-drawer>`
}
