import { createElement, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide'

import '@ark-ui/web/pagination'

import styles from 'styles/pagination.module.css'

type IconNode = typeof ChevronLeft

const icon = (node: IconNode) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const trigger = ({ part, icon: node }: { part: 'first' | 'previous' | 'next' | 'last'; icon: IconNode }) =>
  /* html */ `<ark-pagination-${part}-trigger><button class="${styles.Trigger}">${icon(node)}</button></ark-pagination-${part}-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-pagination class="${styles.Root}" count="5000" page-size="20" sibling-count="2">
      <div class="${styles.Controls}">
        ${trigger({ part: 'first', icon: ChevronsLeft })}
        ${trigger({ part: 'previous', icon: ChevronLeft })}
        <template>
          <ark-pagination-item><button class="${styles.Item}"></button></ark-pagination-item>
          <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
        </template>
        ${trigger({ part: 'next', icon: ChevronRight })}
        ${trigger({ part: 'last', icon: ChevronsRight })}
      </div>
    </ark-pagination>`
}
