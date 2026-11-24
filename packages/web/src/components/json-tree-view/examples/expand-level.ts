import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/json-tree-view'

import styles from 'styles/json-tree-view.module.css'

const arrow = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const data = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  tags: ['tag1', 'tag2', 'tag3'],
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-json-tree-view class="${styles.Root}" default-expanded-depth="2">
    <ark-json-tree-view-tree class="${styles.Tree}">
      <template data-arrow>${arrow}</template>
    </ark-json-tree-view-tree>
  </ark-json-tree-view>`

  const view = root.querySelector('ark-json-tree-view')!
  view.data = data
}
