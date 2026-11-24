import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/json-tree-view'

import styles from 'styles/json-tree-view.module.css'

const arrow = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const data = new Map<string, unknown>([
  ['name', 'ark-ui-json-tree'],
  ['license', 'MIT'],
  ['elements', new Set(['ark-ui', 123, false, true, null, undefined, 456n])],
  [
    'nested',
    new Map<string, unknown>([
      [
        'taglines',
        new Set([
          { name: 'ark-ui', feature: 'headless components' },
          { name: 'ark-ui', feature: 'framework agnostic' },
          { name: 'ark-ui', feature: 'accessible by default' },
        ]),
      ],
    ]),
  ],
])

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
