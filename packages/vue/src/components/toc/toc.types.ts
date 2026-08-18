import type * as toc from '@zag-js/toc'

export interface RootProps {
  autoScroll?: boolean
  activeIds?: string[]
  defaultActiveIds?: string[]
  scrollEl?: () => HTMLElement | null
  id?: string
  ids?: Partial<{
    root: string
    title: string
    list: string
    item: (value: string) => string
    link: (value: string) => string
    indicator: string
  }>
  items: toc.TocItem[]
  rootMargin?: string
  scrollBehavior?: ScrollBehavior
  threshold?: number | number[]
}

export type RootEmits = {
  activeChange: [details: toc.ActiveChangeDetails]
}
