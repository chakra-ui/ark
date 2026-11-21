import { createElement, Bold, Italic, Underline, Strikethrough } from 'lucide'

import '../../src/components/tooltip/index.js'

import styles from 'styles/tooltip.module.css'

const tools = [
  { id: 'bold', label: 'Bold', shortcut: '⌘+B', icon: createElement(Bold, { 'aria-hidden': 'true' }).outerHTML },
  { id: 'italic', label: 'Italic', shortcut: '⌘+I', icon: createElement(Italic, { 'aria-hidden': 'true' }).outerHTML },
  {
    id: 'underline',
    label: 'Underline',
    shortcut: '⌘+U',
    icon: createElement(Underline, { 'aria-hidden': 'true' }).outerHTML,
  },
  {
    id: 'strikethrough',
    label: 'Strikethrough',
    shortcut: '⌘+⇧+X',
    icon: createElement(Strikethrough, { 'aria-hidden': 'true' }).outerHTML,
  },
]

interface Tool {
  id: string
  label: string
  icon: string
}

const trigger = ({ id, label, icon }: Tool) =>
  /* html */ `<ark-tooltip-trigger value="${id}"><button class="${styles.ToolbarButton}" aria-label="${label}">${icon}</button></ark-tooltip-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-tooltip>
      <div class="${styles.Toolbar}">
        ${tools.map(trigger).join('')}
      </div>
      <ark-tooltip-positioner class="${styles.Positioner}">
        <ark-tooltip-content class="${styles.Content}"></ark-tooltip-content>
      </ark-tooltip-positioner>
    </ark-tooltip>`
  root.querySelector('ark-tooltip')!.addEventListener('triggervaluechange', (event) => {
    const tool = tools.find((tool) => tool.id === event.detail.value)
    if (tool)
      root.querySelector('ark-tooltip-content')!.innerHTML =
        /* html */ `${tool.label} <span class="${styles.Shortcut}">${tool.shortcut}</span>`
  })
}
