import { createElement, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide'

import type { PaginationElement } from '../../src/components/pagination/index.js'

import styles from 'styles/pagination.module.css'

import '../../src/components/pagination/index.js'

const pageSizes = [5, 10, 20, 50]

const option = ({ value, selected = false }: { value: number; selected?: boolean }) =>
  /* html */ `<option value="${value}" ${selected ? 'selected' : ''}>${value}</option>`

function onPaginationChange(el: HTMLElement, update: VoidFunction) {
  el.addEventListener('pagechange', () => queueMicrotask(update))
  el.addEventListener('pagesizechange', () => queueMicrotask(update))
  requestAnimationFrame(update)
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-pagination class="${styles.Root}" count="100" default-page-size="10"><div class="hstack">
        <label class="${styles.Text}">Items per page:</label>
        <select class="${styles.PageSizeSelect}">
          ${pageSizes.map((size) => option({ value: size, selected: size === 10 })).join('')}
        </select>
      </div>
      
  <div class="${styles.Controls}">
    
    <ark-pagination-previous-trigger><button class="${styles.Trigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-previous-trigger>
    
  <template>
    <ark-pagination-item><button class="${styles.Item}"></button></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>
    <ark-pagination-next-trigger><button class="${styles.Trigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-next-trigger>
    
  </div>
      <p class="${styles.Text}" data-page></p></ark-pagination>`
  const el = root.querySelector('ark-pagination')!
  const select = root.querySelector('select')!
  select.addEventListener('change', () => el.api?.setPageSize(Number(select.value)))
  onPaginationChange(el, () => {
    if (!el.api) return
    select.value = String(el.api?.pageSize)
    root.querySelector('[data-page]')!.textContent = `Page ${el.api?.page} of ${el.api?.totalPages}`
  })
}
