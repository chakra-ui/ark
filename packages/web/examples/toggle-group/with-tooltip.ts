import { createElement, Bold, Italic, Underline } from 'lucide'

import '../../src/components/toggle-group/index.js'

import '../../src/components/tooltip/index.js'

import styles from 'styles/toggle-group.module.css'

import tooltipStyles from 'styles/tooltip.module.css'

const items = [
  { value: 'bold', label: 'Bold', icon: createElement(Bold, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'italic', label: 'Italic', icon: createElement(Italic, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'underline', label: 'Underline', icon: createElement(Underline, { 'aria-hidden': 'true' }).outerHTML },
]

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = `
    <ark-tooltip>
      <ark-toggle-group class="${styles.Root}" default-value="bold">
        ${items
          .map(
            (item) => `
        <ark-tooltip-trigger value="${item.value}">
          <ark-toggle-group-item value="${item.value}">
            <button class="${styles.Item}" aria-label="${item.label}">${item.icon}</button>
          </ark-toggle-group-item>
        </ark-tooltip-trigger>`,
          )
          .join('')}
      </ark-toggle-group>
      <ark-tooltip-positioner class="${tooltipStyles.Positioner}">
        <ark-tooltip-content class="${tooltipStyles.Content}"></ark-tooltip-content>
      </ark-tooltip-positioner>
    </ark-tooltip>`
  host.querySelector('ark-tooltip')!.addEventListener('triggervaluechange', (event) => {
    const value = event.detail.value
    const item = items.find((item) => item.value === value)
    if (item) host.querySelector('ark-tooltip-content')!.textContent = item.label
  })
  root.replaceChildren(host)
}
