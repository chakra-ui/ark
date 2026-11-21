import { createElement, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide'

import type { PaginationElement } from '../../src/components/pagination/index.js'

import styles from 'styles/pagination.module.css'

import '../../src/components/pagination/index.js'

const users = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com' },
  { id: 2, name: 'Liam Johnson', email: 'liam@example.com' },
  { id: 3, name: 'Olivia Brown', email: 'olivia@example.com' },
  { id: 4, name: 'Noah Davis', email: 'noah@example.com' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com' },
  { id: 6, name: 'Ethan Garcia', email: 'ethan@example.com' },
  { id: 7, name: 'Sophia Rodriguez', email: 'sophia@example.com' },
  { id: 8, name: 'Mason Lee', email: 'mason@example.com' },
  { id: 9, name: 'Isabella Walker', email: 'isabella@example.com' },
  { id: 10, name: 'James Hall', email: 'james@example.com' },
  { id: 11, name: 'Mia Allen', email: 'mia@example.com' },
  { id: 12, name: 'Benjamin Young', email: 'benjamin@example.com' },
  { id: 13, name: 'Charlotte King', email: 'charlotte@example.com' },
  { id: 14, name: 'William Wright', email: 'william@example.com' },
  { id: 15, name: 'Amelia Scott', email: 'amelia@example.com' },
  { id: 16, name: 'Henry Green', email: 'henry@example.com' },
  { id: 17, name: 'Harper Adams', email: 'harper@example.com' },
  { id: 18, name: 'Sebastian Baker', email: 'sebastian@example.com' },
  { id: 19, name: 'Evelyn Nelson', email: 'evelyn@example.com' },
  { id: 20, name: 'Jack Carter', email: 'jack@example.com' },
]

function onPaginationChange(el: HTMLElement, update: VoidFunction) {
  el.addEventListener('pagechange', () => queueMicrotask(update))
  el.addEventListener('pagesizechange', () => queueMicrotask(update))
  requestAnimationFrame(update)
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-pagination class="${styles.Root}" count="20" page-size="5"><div class="${styles.Grid}"></div>
  <div class="${styles.Controls}">
    
    <ark-pagination-previous-trigger><button class="${styles.Trigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-previous-trigger>
    
  <template>
    <ark-pagination-item><button class="${styles.Item}"></button></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>
    <ark-pagination-next-trigger><button class="${styles.Trigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-pagination-next-trigger>
    
  </div></ark-pagination>`
  const el = root.querySelector('ark-pagination')!
  onPaginationChange(el, () => {
    if (!el.api) return
    root.querySelector(`.${styles.Grid}`)!.innerHTML = el.api
      .slice(users)
      .map(
        (user) =>
          /* html */ `<div class="${styles.GridItem}"><span class="${styles.GridItemTitle}">${user.name}</span><span class="${styles.GridItemText}">${user.email}</span></div>`,
      )
      .join('')
  })
}
