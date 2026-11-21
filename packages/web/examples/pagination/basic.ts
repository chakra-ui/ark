import { createElement, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide'

import '../../src/components/pagination/index.js'

import styles from 'styles/pagination.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-pagination class="${styles.Root}" count="5000" page-size="10" sibling-count="2">
  <div class="${styles.Controls}">
    
    <ark-pagination-previous-trigger><button class="${styles.Trigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-previous-trigger>
    
  <template>
    <ark-pagination-item><button class="${styles.Item}"></button></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>
    <ark-pagination-next-trigger><button class="${styles.Trigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-next-trigger>
    
  </div></ark-pagination>`
}
