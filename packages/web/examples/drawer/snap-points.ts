import { createElement, X } from 'lucide'

import '../../src/components/drawer/index.js'

import styles from 'styles/drawer.module.css'

const closeIcon = createElement(X, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-drawer snap-points="0.25, 0.5, 1" default-snap-point="0.5">
    <ark-drawer-trigger><button class="${styles.Trigger}">Open</button></ark-drawer-trigger>
    <ark-drawer-backdrop class="${styles.Backdrop}"></ark-drawer-backdrop>
    <ark-drawer-positioner class="${styles.Positioner}">
      <ark-drawer-content class="${styles.Content}">
        <ark-drawer-grabber class="${styles.Grabber}">
          <ark-drawer-grabber-indicator class="${styles.GrabberIndicator}"></ark-drawer-grabber-indicator>
        </ark-drawer-grabber>
        <ark-drawer-title class="${styles.Title}">Drawer with Snap Points</ark-drawer-title>
        <p>This drawer has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
        <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
        <output>Snap point: 0.5</output>
        <ark-drawer-close-trigger><button class="${styles.CloseTrigger}" aria-label="Close">${closeIcon}</button></ark-drawer-close-trigger>
      </ark-drawer-content>
    </ark-drawer-positioner>
  </ark-drawer>`

  const drawer = root.querySelector('ark-drawer')!
  const output = root.querySelector('output')!

  drawer.addEventListener('snappointchange', (event) => {
    output.textContent = `Snap point: ${event.detail.snapPoint}`
  })
}
