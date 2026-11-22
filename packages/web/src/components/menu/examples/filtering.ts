import { createElement, ChevronDown, X, Check } from 'lucide'

import '@ark-ui/web/menu'

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

const attr = (name: string, on?: boolean) => (on ? name : '')

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const item = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

const group = ({ name, label }: { name: string; label: string }, items: string[]) => /* html */ `
  <ark-menu-item-group class="${styles.ItemGroup}" name="${name}">
    <ark-menu-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-menu-item-group-label>
    ${items.join('')}
  </ark-menu-item-group>`

interface CheckboxItemProps {
  value: string
  label: string
  checked?: boolean
}

const checkboxItem = ({ value, label, checked = false }: CheckboxItemProps) => /* html */ `
  <ark-menu-checkbox-item class="${styles.CheckboxItem}" value="${value}" ${attr('checked', checked)} close-on-select="false">
    <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
    <ark-menu-item-text class="${styles.ItemText}">${label}</ark-menu-item-text>
  </ark-menu-checkbox-item>`

const viewOptions: CheckboxItemProps[] = [
  { value: 'details', label: 'Show details', checked: true },
  { value: 'sidebar', label: 'Show sidebar' },
  { value: 'offline', label: 'Keep available offline' },
]

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
              .map((name) => group({ name, label: name }, actions.filter((action) => action.group === name).map(item)))
              .join('')}
            ${group({ name: 'view', label: 'View' }, viewOptions.map(checkboxItem))}
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
