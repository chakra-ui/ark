import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/json-tree-view'

import styles from 'styles/json-tree-view.module.css'

const arrow = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const data = Object.assign(new Error('Could not load user'), {
  stack: 'Error: Could not load user\n    at fetchUser (api.ts:12:9)\n    at loadProfile (profile.ts:4:3)',
})

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-json-tree-view class="${styles.Root}" default-expanded-depth="1">
    <ark-json-tree-view-tree class="${styles.Tree}">
      <template data-arrow>${arrow}</template>
    </ark-json-tree-view-tree>
  </ark-json-tree-view>`

  const view = root.querySelector('ark-json-tree-view')!
  view.data = data
}
