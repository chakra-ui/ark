import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/json-tree-view'

import styles from 'styles/json-tree-view.module.css'

const arrow = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-json-tree-view class="${styles.Root}" default-expanded-depth="1">
    <script type="application/json">{"id": 42, "status": "active", "roles": ["admin", "editor"], "profile": {"theme": "dark", "beta": true}}</script>
    <ark-json-tree-view-tree class="${styles.Tree}" indent-guide>
      <template data-arrow>${arrow}</template>
    </ark-json-tree-view-tree>
  </ark-json-tree-view>`
}
