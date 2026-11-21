import { createElement, ChevronDown, X, Check } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const actions = [
  { label: 'New file', value: 'new-file', group: 'File' },
  { label: 'Open file', value: 'open-file', group: 'File' },
  { label: 'Save', value: 'save', group: 'File' },
  { label: 'Save as', value: 'save-as', group: 'File' },
  { label: 'Rename', value: 'rename', group: 'File' },
  { label: 'Duplicate', value: 'duplicate', group: 'Organize' },
  { label: 'Move to trash', value: 'trash', group: 'Organize' },
  { label: 'Download a copy', value: 'download', group: 'Organize' },
  { label: 'Share link', value: 'share', group: 'Share' },
  { label: 'Invite people', value: 'invite', group: 'Share' },
]

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const item = (value: string, label: string, extra = '') =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}" ${extra}>${label}</ark-menu-item>`

const option = (tag: string, className: string, value: string, label: string, extra = '') => /* html */ `
  <${tag} class="${className}" value="${value}" ${extra}>
    <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
    <ark-menu-item-text class="${styles.ItemText}">${label}</ark-menu-item-text>
  </${tag}>`

export function mount(root: HTMLElement) {
  const groups = [...new Set(actions.map((action) => action.group))]
  const host = fragment(/* html */ `
    <ark-menu popup-type="dialog">
      <ark-menu-trigger>
        <button class="${styles.Trigger}">Actions<ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
      </ark-menu-trigger>
      <ark-menu-positioner class="${styles.Positioner}">
        <ark-menu-content class="${styles.Content}">
          <div class="${styles.InputControl}">
            <ark-menu-input><input class="${styles.Input}" aria-label="Filter actions" placeholder="Search actions..." /></ark-menu-input>
            <button type="button" class="${styles.InputClear}" tabindex="-1" aria-hidden="true" hidden>${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button>
          </div>
          <ark-menu-empty class="${styles.Empty}">No actions found</ark-menu-empty>
          <ark-menu-list class="${styles.List}">
            ${groups
              .map(
                (group) => /* html */ `
              <ark-menu-item-group class="${styles.ItemGroup}" name="${group}">
                <ark-menu-item-group-label class="${styles.ItemGroupLabel}">${group}</ark-menu-item-group-label>
                ${actions
                  .filter((action) => action.group === group)
                  .map((action) => item(action.value, action.label))
                  .join('')}
              </ark-menu-item-group>`,
              )
              .join('')}
            <ark-menu-item-group class="${styles.ItemGroup}" name="view">
              <ark-menu-item-group-label class="${styles.ItemGroupLabel}">View</ark-menu-item-group-label>
              ${option('ark-menu-checkbox-item', styles.CheckboxItem, 'details', 'Show details', 'checked close-on-select="false"')}
              ${option('ark-menu-checkbox-item', styles.CheckboxItem, 'sidebar', 'Show sidebar', 'close-on-select="false"')}
              ${option('ark-menu-checkbox-item', styles.CheckboxItem, 'offline', 'Keep available offline', 'close-on-select="false"')}
            </ark-menu-item-group>
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>`)
  const input = host.querySelector('input')!
  const clear = host.querySelector<HTMLButtonElement>(`.${styles.InputClear}`)!
  const sync = () => (clear.hidden = !input.value)
  input.addEventListener('input', sync)
  host.querySelector('ark-menu')!.addEventListener('openchange', sync)
  clear.addEventListener('click', () => {
    input.value = ''
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
  })
  root.replaceChildren(host)
}
