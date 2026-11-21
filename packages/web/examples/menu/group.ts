import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

const group = ({ name, label }: { name: string; label: string }, items: string[]) => /* html */ `
  <ark-menu-item-group class="${styles.ItemGroup}" name="${name}">
    <ark-menu-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-menu-item-group-label>
    ${items.join('')}
  </ark-menu-item-group>`

const item = ({ value, label, disabled = false }: { value: string; label: string; disabled?: boolean }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}" ${attr('disabled', disabled)}>${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        Edit
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-list class="${styles.List}">
          ${group({ name: 'clipboard', label: 'Clipboard' }, [
            item({ value: 'cut', label: 'Cut' }),
            item({ value: 'copy', label: 'Copy' }),
            item({ value: 'paste', label: 'Paste', disabled: true }),
          ])}
          <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
          ${group({ name: 'history', label: 'History' }, [item({ value: 'undo', label: 'Undo' }), item({ value: 'redo', label: 'Redo' })])}
        </ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
