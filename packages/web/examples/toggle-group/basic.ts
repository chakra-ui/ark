import { createElement, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide'

import '../../src/components/toggle-group/index.js'

import styles from 'styles/toggle-group.module.css'

interface Item {
  value: string
  icon: string
}

const item = ({ value, icon }: Item) =>
  /* html */ `<ark-toggle-group-item value="${value}"><button class="${styles.Item}">${icon}</button></ark-toggle-group-item>`

const alignItems: Item[] = [
  { value: 'left', icon: createElement(AlignLeft, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'center', icon: createElement(AlignCenter, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'right', icon: createElement(AlignRight, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'justify', icon: createElement(AlignJustify, { 'aria-hidden': 'true' }).outerHTML },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toggle-group class="${styles.Root}" default-value="left">
    ${alignItems.map(item).join('')}
  </ark-toggle-group>`
}
