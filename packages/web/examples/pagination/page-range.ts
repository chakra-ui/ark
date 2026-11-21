import { createElement, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/pagination.module.css'

import '@ark-ui/web/pagination'

function onPaginationChange(el: HTMLElement, update: VoidFunction) {
  el.addEventListener('pagechange', () => queueMicrotask(update))
  el.addEventListener('pagesizechange', () => queueMicrotask(update))
  requestAnimationFrame(update)
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-pagination class="${styles.Root}" count="100" page-size="10">
  <div class="${styles.Controls}">
    <ark-pagination-previous-trigger><button class="${styles.Trigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-previous-trigger>
  <template>
    <ark-pagination-item><button class="${styles.Item}"></button></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>
    <ark-pagination-next-trigger><button class="${styles.Trigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-next-trigger>
  </div>
      <div class="stack">
        <p class="${styles.Text}" data-range></p>
        <p class="${styles.Text}" data-page></p>
      </div></ark-pagination>`
  const el = root.querySelector('ark-pagination')!
  onPaginationChange(el, () => {
    const api = el.api
    if (!api) return
    root.querySelector('[data-range]')!.textContent =
      `Showing ${api.pageRange.start + 1}-${api.pageRange.end} of ${api.count} results`
    root.querySelector('[data-page]')!.textContent = `Page ${api.page} of ${api.totalPages}`
  })
}
