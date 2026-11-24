import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/json-tree-view'

import styles from 'styles/json-tree-view.module.css'

const arrow = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const data = [
  function sum(a: number, b: number) {
    return a + b
  },
  async (promises: Promise<unknown>[]) => await Promise.all(promises),
  function* generator(a: number) {
    while (a > 0) {
      yield a - 1
    }
  },
]

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
