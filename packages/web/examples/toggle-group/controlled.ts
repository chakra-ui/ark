import { createElement, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide'

import '@ark-ui/web/toggle-group'

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
  const host = document.createElement('div')
  host.innerHTML = /* html */ `
    <ark-toggle-group class="${styles.Root}" value="left">
      ${alignItems.map(item).join('')}
    </ark-toggle-group>`
  const el = host.querySelector('ark-toggle-group')!
  el.addEventListener('valuechange', (event) => {
    el.setAttribute('value', event.detail.value.join(','))
  })
  root.replaceChildren(host)
}
