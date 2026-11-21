import { createElement, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide'

import '../../src/components/pagination/index.js'

import styles from 'styles/pagination.module.css'

type IconNode = typeof ChevronLeft

interface PaginationProps {
  count: number
  pageSize: number
  siblingCount: number
}

const icon = (node: IconNode) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const trigger = ({ part, icon: node }: { part: 'first' | 'previous' | 'next' | 'last'; icon: IconNode }) =>
  /* html */ `<ark-pagination-${part}-trigger><button class="${styles.Trigger}">${icon(node)}</button></ark-pagination-${part}-trigger>`

const pages = () => /* html */ `
  <template>
    <ark-pagination-item><button class="${styles.Item}"></button></ark-pagination-item>
    <ark-pagination-ellipsis class="${styles.Ellipsis}">&#8230;</ark-pagination-ellipsis>
  </template>`

const controls = ({ edges = false }: { edges?: boolean } = {}) => /* html */ `
  <div class="${styles.Controls}">
    ${edges ? trigger({ part: 'first', icon: ChevronsLeft }) : ''}
    ${trigger({ part: 'previous', icon: ChevronLeft })}
    ${pages()}
    ${trigger({ part: 'next', icon: ChevronRight })}
    ${edges ? trigger({ part: 'last', icon: ChevronsRight }) : ''}
  </div>`

const pagination = ({ count, pageSize, siblingCount }: PaginationProps, children: string[]) =>
  /* html */ `<ark-pagination class="${styles.Root}" count="${count}" page-size="${pageSize}" sibling-count="${siblingCount}">${children.join('')}</ark-pagination>`

export function mount(root: HTMLElement) {
  root.innerHTML = pagination({ count: 5000, pageSize: 20, siblingCount: 2 }, [controls({ edges: true })])
}
