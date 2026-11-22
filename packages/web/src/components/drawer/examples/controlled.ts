import { createElement, X } from 'lucide'

import '@ark-ui/web/drawer'

import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'

const closeIcon = createElement(X, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <button class="${button.Root}" data-toggle>Open Drawer</button>
  <output>Open: false</output>

  <ark-drawer open="false">
    <ark-drawer-backdrop class="${styles.Backdrop}"></ark-drawer-backdrop>
    <ark-drawer-positioner class="${styles.Positioner}">
      <ark-drawer-content class="${styles.Content}">
        <ark-drawer-grabber class="${styles.Grabber}">
          <ark-drawer-grabber-indicator class="${styles.GrabberIndicator}"></ark-drawer-grabber-indicator>
        </ark-drawer-grabber>
        <ark-drawer-title class="${styles.Title}">Controlled Drawer</ark-drawer-title>
        <ark-drawer-description class="${styles.Description}">This drawer is controlled via state.</ark-drawer-description>
        <ark-drawer-close-trigger><button class="${styles.CloseTrigger}" aria-label="Close">${closeIcon}</button></ark-drawer-close-trigger>
      </ark-drawer-content>
    </ark-drawer-positioner>
  </ark-drawer>`

  const drawer = root.querySelector('ark-drawer')!
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]')!
  const output = root.querySelector('output')!

  const setOpen = (open: boolean) => {
    drawer.setAttribute('open', String(open))
    toggle.textContent = open ? 'Close Drawer' : 'Open Drawer'
    output.textContent = `Open: ${open}`
  }

  toggle.addEventListener('click', () => setOpen(drawer.getAttribute('open') !== 'true'))
  drawer.addEventListener('openchange', (event) => setOpen(event.detail.open))
}
