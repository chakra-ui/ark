import { createElement, Bold, Italic, Underline } from 'lucide'

import '../../src/components/toggle-group/index.js'

import styles from 'styles/toggle-group.module.css'

const item = (value: string, content: string, attrs = '') =>
  `<ark-toggle-group-item value="${value}"><button class="${styles.Item}" ${attrs}>${content}</button></ark-toggle-group-item>`

const toggleGroup = (attrs: string, items: { value: string; icon: string }[]) => `
  <ark-toggle-group class="${styles.Root}" ${attrs}>
    ${items.map((entry) => item(entry.value, entry.icon)).join('')}
  </ark-toggle-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = toggleGroup(`default-value="bold" multiple`, [
    { value: 'bold', icon: createElement(Bold, { 'aria-hidden': 'true' }).outerHTML },
    { value: 'italic', icon: createElement(Italic, { 'aria-hidden': 'true' }).outerHTML },
    { value: 'underline', icon: createElement(Underline, { 'aria-hidden': 'true' }).outerHTML },
  ])
}
