import { createElement, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide'

import '../../src/components/toggle-group/index.js'

import styles from 'styles/toggle-group.module.css'

const item = (value: string, content: string, attrs = '') =>
  /* html */ `<ark-toggle-group-item value="${value}"><button class="${styles.Item}" ${attrs}>${content}</button></ark-toggle-group-item>`

const toggleGroup = (attrs: string, items: { value: string; icon: string }[]) => /* html */ `
  <ark-toggle-group class="${styles.Root}" ${attrs}>
    ${items.map((entry) => item(entry.value, entry.icon)).join('')}
  </ark-toggle-group>`

const alignItems = [
  { value: 'left', icon: createElement(AlignLeft, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'center', icon: createElement(AlignCenter, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'right', icon: createElement(AlignRight, { 'aria-hidden': 'true' }).outerHTML },
  { value: 'justify', icon: createElement(AlignJustify, { 'aria-hidden': 'true' }).outerHTML },
]

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = toggleGroup(`value="left"`, alignItems)
  const el = host.querySelector('ark-toggle-group')!
  el.addEventListener('valuechange', (event) => {
    el.setAttribute('value', event.detail.value.join(','))
  })
  root.replaceChildren(host)
}
