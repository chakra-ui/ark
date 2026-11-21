import * as pagination from '@zag-js/pagination'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import type { PaginationElement } from './index.js'
import { repeat, root } from './shared.js'

const templateOf = (el: HTMLElement) =>
  Array.from(el.querySelectorAll('template')).find((template) =>
    Array.from(template.content.children).some((child) =>
      child.matches('ark-pagination-item, ark-pagination-ellipsis'),
    ),
  )

defineRoot<pagination.Api>({
  properties: ['getPageUrl', 'ids', 'translations'],

  tag: root,
  machine: pagination.machine,
  connect: pagination.connect,
  attributes: [
    'count',
    'page',
    'default-page',
    'page-size',
    'default-page-size',
    'sibling-count',
    'boundary-count',
    'type',
  ],
  state: {
    page: {
      get: (api) => api.page,
      set: (api, value) => api.setPage(Number(value)),
    },
    pageSize: {
      get: (api) => api.pageSize,
      set: (api, value) => api.setPageSize(Number(value)),
    },
  },
  props: (el) => {
    const { getPageUrl, translations } = el as PaginationElement
    return {
      count: num(el, 'count'),
      page: num(el, 'page'),
      defaultPage: num(el, 'default-page'),
      pageSize: num(el, 'page-size'),
      defaultPageSize: num(el, 'default-page-size'),
      siblingCount: num(el, 'sibling-count'),
      boundaryCount: num(el, 'boundary-count'),
      type: str<pagination.Props['type'] & string>(el, 'type'),
      getPageUrl,
      translations,
    }
  },
  events: { onPageChange: 'pagechange', onPageSizeChange: 'pagesizechange' },
  rootProps: (api) => api.getRootProps(),
  render: (api, el) => {
    const template = templateOf(el)
    if (!template) return
    // Pages keyed by value, so the clicked page button keeps focus as the window shifts
    repeat(
      template,
      api.pages,
      (page, index) => (page.type === 'page' ? `page:${page.value}` : `ellipsis:${index}`),
      (node, page, index) => {
        if (page.type === 'page') node.setAttribute('value', String(page.value))
        else node.setAttribute('index', String(index))
      },
      (page) => (page.type === 'page' ? 'ark-pagination-item' : 'ark-pagination-ellipsis'),
    )
  },
})
