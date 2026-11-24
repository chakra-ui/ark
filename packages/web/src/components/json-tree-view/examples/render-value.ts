import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/json-tree-view'

import styles from 'styles/json-tree-view.module.css'

const arrow = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const data = {
  name: 'John Doe',
  age: 30,
  number: Number.NaN,
  email: 'john.doe@example.com',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.replace(/^"(.*)"$/, '$1'))

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-json-tree-view class="${styles.Root}" default-expanded-depth="2">
    <ark-json-tree-view-tree class="${styles.Tree}">
      <template data-arrow>${arrow}</template>
    </ark-json-tree-view-tree>
  </ark-json-tree-view>`

  const view = root.querySelector('ark-json-tree-view')!
  view.querySelector('ark-json-tree-view-tree')!.renderValue = (node) => {
    if (node.type !== 'text' || typeof node.value !== 'string' || !isEmail(node.value)) return undefined
    const link = document.createElement('a')
    link.href = `mailto:${node.value.replace(/^"(.*)"$/, '$1')}`
    link.target = '_blank'
    link.rel = 'noreferrer'
    link.textContent = node.value
    return link
  }
  view.data = data
}
