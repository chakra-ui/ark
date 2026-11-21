import { createElement, ChevronDown } from 'lucide'

import '@ark-ui/web/menu'

import button from 'styles/button.module.css'

import styles from 'styles/menu.module.css'

const items = [
  { value: 'edit', label: 'Edit' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'archive', label: 'Archive' },
  { value: 'delete', label: 'Delete' },
]

const item = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

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
          <ark-menu-content class="${styles.Content}">
            <ark-menu-list class="${styles.List}">${items.map(item).join('')}</ark-menu-list>
          </ark-menu-content>
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
