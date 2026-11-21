import { createElement, Bold, Italic, Underline } from 'lucide'

import '../../src/components/toggle-group/index.js'

import styles from 'styles/toggle-group.module.css'

interface Item {
  value: string
  icon: string
}

const item = ({ value, icon }: Item) =>
  /* html */ `<ark-toggle-group-item value="${value}"><button class="${styles.Item}">${icon}</button></ark-toggle-group-item>`

const formatItems: Item[] = [
  { value: 'bold', icon: createElement(Bold, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'italic', icon: createElement(Italic, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'underline', icon: createElement(Underline, { 'aria-hidden': 'true' }).outerHTML },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-toggle-group class="${styles.Root}" default-value="bold" multiple>
      ${formatItems.map(item).join('')}
    </ark-toggle-group>`
}
