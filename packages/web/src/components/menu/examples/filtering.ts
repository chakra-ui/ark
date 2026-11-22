import { createElement, Check, ChevronDown, X } from 'lucide'

import { createFilter } from '@ark-ui/web/locale'
import { createListCollection } from '@ark-ui/web/menu'

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

const viewOptions = [
  { label: 'Show details', value: 'details', group: 'View', type: 'checkbox' as const },
  { label: 'Show sidebar', value: 'sidebar', group: 'View', type: 'checkbox' as const },
  { label: 'Keep available offline', value: 'offline', group: 'View', type: 'checkbox' as const },
]

export function mount(root: HTMLElement) {
  const { contains } = createFilter({ sensitivity: 'base' })
  const checked = new Set(['details'])

  root.innerHTML = /* html */ `
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
            <template data-group>
              <ark-menu-item-group class="${styles.ItemGroup}">
                <ark-menu-item-group-label class="${styles.ItemGroupLabel}"></ark-menu-item-group-label>
              </ark-menu-item-group>
            </template>
            <template>
              <ark-menu-item class="${styles.Item}"><ark-menu-item-text></ark-menu-item-text></ark-menu-item>
            </template>
            <template data-type="checkbox">
              <ark-menu-checkbox-item class="${styles.CheckboxItem}" close-on-select="false">
                <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
                <ark-menu-item-text class="${styles.ItemText}"></ark-menu-item-text>
              </ark-menu-checkbox-item>
            </template>
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>`

  const menu = root.querySelector('ark-menu')!
  const input = root.querySelector('input')!
  const clear = root.querySelector<HTMLButtonElement>(`.${styles.InputClear}`)!

  const render = () => {
    const query = input.value
    clear.hidden = !query
    menu.collection = createListCollection({
      items: [...actions, ...viewOptions.map((option) => ({ ...option, checked: checked.has(option.value) }))].filter(
        (item) => contains(item.label, query),
      ),
      groupBy: (item) => item.group,
    })
  }

  menu.addEventListener(
    'checkedchange',
    (event) => {
      const option = event.target as HTMLElement
      const value = option.getAttribute('value') ?? ''
      if (option.hasAttribute('checked')) checked.add(value)
      else checked.delete(value)
      render()
    },
    { capture: true },
  )
  input.addEventListener('input', render)
  menu.addEventListener('exitcomplete', () => {
    input.value = ''
    render()
  })
  clear.addEventListener('click', () => {
    input.value = ''
    render()
    input.focus()
  })

  render()
}
