import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/menu.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <button type="button" class="${button.Root}" data-toggle>Toggle</button>
      
  <ark-menu open="false">
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        Actions
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}"><ark-menu-list class="${styles.List}"><ark-menu-item class="${styles.Item}" value="edit" >Edit</ark-menu-item><ark-menu-item class="${styles.Item}" value="duplicate" >Duplicate</ark-menu-item><ark-menu-item class="${styles.Item}" value="archive" >Archive</ark-menu-item><ark-menu-item class="${styles.Item}" value="delete" >Delete</ark-menu-item></ark-menu-list></ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>
    </div>`
  const menuEl = root.querySelector('ark-menu')!
  root.querySelector('[data-toggle]')!.addEventListener('click', () => {
    menuEl.setAttribute('open', String(menuEl.getAttribute('open') !== 'true'))
  })
  menuEl.addEventListener('openchange', (event) => {
    if (event.target !== menuEl) return
    menuEl.setAttribute('open', String(event.detail.open))
  })
}
