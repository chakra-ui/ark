import { createElement, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide'

import '../../src/components/pagination/index.js'

import styles from 'styles/pagination.module.css'

const trigger = (part: string, content: string, tag = 'button') =>
  /* html */ `<ark-pagination-${part}-trigger><${tag} class="${styles.Trigger}">${content}</${tag}></ark-pagination-${part}-trigger>`

const pages = (tag = 'button') => /* html */ `
  <template>
    <ark-pagination-item><${tag} class="${styles.Item}"></${tag}></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>`

const controls = ({ edges = false, tag = 'button' } = {}) => /* html */ `
  <div class="${styles.Controls}">
    ${edges ? trigger('first', createElement(ChevronsLeft, { 'aria-hidden': 'true' }).outerHTML, tag) : ''}
    ${trigger('previous', createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML, tag)}
    ${pages(tag)}
    ${trigger('next', createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML, tag)}
    ${edges ? trigger('last', createElement(ChevronsRight, { 'aria-hidden': 'true' }).outerHTML, tag) : ''}
  </div>`

const paginationMarkup = (attrs: string, body = controls()) =>
  /* html */ `<ark-pagination class="${styles.Root}" ${attrs}>${body}</ark-pagination>`

export function mount(root: HTMLElement) {
  root.innerHTML = paginationMarkup('count="5000" page-size="20" sibling-count="2"', controls({ edges: true }))
}
