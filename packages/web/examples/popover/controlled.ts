import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <output>Open: false</output>
    
  <ark-popover open="false">
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}"><ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>
  <ark-popover-title class="${styles.Title}">Team Members</ark-popover-title>
  <ark-popover-description class="${styles.Description}">Invite colleagues to collaborate on this project.</ark-popover-description></ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
  const popoverEl = root.querySelector('ark-popover')!
  popoverEl.addEventListener('openchange', (event) => {
    const { open } = event.detail
    popoverEl.setAttribute('open', String(open))
    root.querySelector('output')!.textContent = `Open: ${open}`
  })
}
