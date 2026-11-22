import { createElement, ChevronLeft, ChevronRight } from 'lucide'

import '@ark-ui/web/pagination'

import styles from 'styles/pagination.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-pagination class="${styles.Root}" count="100" page-size="10" sibling-count="2" type="link">
  <div class="${styles.Controls}">
    <ark-pagination-previous-trigger><a class="${styles.Trigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</a></ark-pagination-previous-trigger>
  <template>
    <ark-pagination-item><a class="${styles.Item}"></a></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>
    <ark-pagination-next-trigger><a class="${styles.Trigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</a></ark-pagination-next-trigger>
  </div></ark-pagination>`
  root.querySelector('ark-pagination')!.getPageUrl = ({ page }) => `/page=${page}`
}
