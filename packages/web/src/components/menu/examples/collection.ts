import { createElement, Check, ChevronDown } from 'lucide'

import { createListCollection } from '@ark-ui/web/menu'

import styles from 'styles/menu.module.css'

interface Item {
  value: string
  label: string
  group: string
  type?: 'checkbox' | 'radio'
}

const items: Item[] = [
  { value: 'new-file', label: 'New file', group: 'File' },
  { value: 'open-file', label: 'Open file', group: 'File' },
  { value: 'toolbar', label: 'Show toolbar', group: 'View', type: 'checkbox' },
  { value: 'status-bar', label: 'Show status bar', group: 'View', type: 'checkbox' },
  { value: 'name', label: 'Name', group: 'Sort by', type: 'radio' },
  { value: 'date', label: 'Date modified', group: 'Sort by', type: 'radio' },
]

export function mount(root: HTMLElement) {
  const check = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

  root.innerHTML = /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        File
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-list class="${styles.List}">
          <template data-group>
            <ark-menu-item-group class="${styles.ItemGroup}">
              <ark-menu-item-group-label class="${styles.ItemGroupLabel}"></ark-menu-item-group-label>
            </ark-menu-item-group>
          </template>
          <template data-group data-type="radio">
            <ark-menu-radio-item-group class="${styles.ItemGroup}">
              <ark-menu-item-group-label class="${styles.ItemGroupLabel}"></ark-menu-item-group-label>
            </ark-menu-radio-item-group>
          </template>
          <template>
            <ark-menu-item class="${styles.Item}"></ark-menu-item>
          </template>
          <template data-type="checkbox">
            <ark-menu-checkbox-item class="${styles.CheckboxItem}" close-on-select="false">
              <ark-menu-item-indicator class="${styles.ItemIndicator}">${check}</ark-menu-item-indicator>
              <ark-menu-item-text class="${styles.ItemText}"></ark-menu-item-text>
            </ark-menu-checkbox-item>
          </template>
          <template data-type="radio">
            <ark-menu-radio-item class="${styles.RadioItem}">
              <ark-menu-item-indicator class="${styles.ItemIndicator}">${check}</ark-menu-item-indicator>
              <ark-menu-item-text class="${styles.ItemText}"></ark-menu-item-text>
            </ark-menu-radio-item>
          </template>
        </ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

  const menu = root.querySelector('ark-menu')!
  const checked = new Set(['toolbar'])
  let sortBy = 'date'

  const isChecked = (item: Item) => (item.type === 'radio' ? item.value === sortBy : checked.has(item.value))

  const render = () => {
    menu.collection = createListCollection({
      items: items.map((item) => ({ ...item, checked: isChecked(item) })),
      groupBy: (item) => item.group,
      groupSort: ['File', 'View', 'Sort by'],
    })
  }

  menu.addEventListener(
    'checkedchange',
    (event) => {
      const item = event.target as HTMLElement
      const value = item.getAttribute('value') ?? ''
      if (item.hasAttribute('checked')) checked.add(value)
      else checked.delete(value)
      render()
    },
    { capture: true },
  )
  menu.addEventListener(
    'valuechange',
    (event) => {
      sortBy = (event.target as HTMLElement).getAttribute('value') ?? ''
      render()
    },
    { capture: true },
  )

  render()
}
