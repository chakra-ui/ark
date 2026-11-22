import { createElement, Check, ChevronsUpDown } from 'lucide'

import '@ark-ui/web/tabs'
import { createListCollection } from '@ark-ui/web/select'

import styles from 'styles/select.module.css'

import tabs from 'styles/tabs.module.css'

const refs: Record<string, string[]> = {
  branches: ['main', 'develop', 'feat/date-input', 'feat/listbox-grid', 'fix/menu-focus'],
  tags: ['v6.0.0', 'v5.36.1', 'v5.36.0', 'v5.35.2', 'v5.35.1'],
}

const trigger = (value: string, label: string) => /* html */ `
  <ark-tabs-trigger value="${value}"><button class="${tabs.Trigger}">${label}</button></ark-tabs-trigger>`

const content = (value: string) => /* html */ `
  <ark-tabs-content class="${tabs.Content}" value="${value}">
    <template>
      <ark-select-list class="${styles.List}">
        <template>
          <ark-select-item class="${styles.Item}">
            <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
            <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
          </ark-select-item>
        </template>
      </ark-select-list>
    </template>
  </ark-tabs-content>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-select class="${styles.Root}" value="main">
    <ark-select-label class="${styles.Label}">Switch branches or tags</ark-select-label>
    <ark-select-control class="${styles.Control}">
      <ark-select-trigger>
        <button class="${styles.Trigger}">
          <span class="${styles.ValueText}">main</span>
          <ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>
        </button>
      </ark-select-trigger>
    </ark-select-control>
    <ark-select-positioner class="${styles.Positioner}">
      <ark-select-content class="${styles.Content}">
        <ark-tabs class="${tabs.Root}" default-value="branches" unmount-on-exit>
          <ark-tabs-list class="${tabs.List}">${trigger('branches', 'Branches')}${trigger('tags', 'Tags')}</ark-tabs-list>
          ${content('branches')}${content('tags')}
        </ark-tabs>
      </ark-select-content>
    </ark-select-positioner>
  </ark-select>`

  const select = root.querySelector('ark-select')!
  const valueText = root.querySelector<HTMLElement>(`.${styles.ValueText}`)!
  const show = (tab: string) => (select.collection = createListCollection({ items: refs[tab] }))

  show('branches')
  root.querySelector('ark-tabs')!.addEventListener('valuechange', (event) => {
    if (event.detail.value) show(event.detail.value)
  })
  select.addEventListener('valuechange', (event) => {
    if (event.target !== select) return
    select.setAttribute('value', event.detail.value.join(','))
    valueText.textContent = event.detail.value[0] ?? ''
  })
}
