import type * as toc from '@zag-js/toc'

export interface RootProps {
  /**
   * Whether to auto-scroll the TOC container so the first active item
   * is visible when active headings change.
   * @default true
   */
  autoScroll?: boolean
  /**
   * The controlled active heading ids.
   */
  activeIds?: string[]
  /**
   * The default active heading ids when rendered.
   * Use when you don't need to control the active headings.
   */
  defaultActiveIds?: string[]
  /**
   * Function that returns the scroll container element to observe within.
   * Defaults to the document/viewport.
   */
  getScrollEl?: () => HTMLElement | null
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the TOC. Useful for composition.
   */
  ids?: Partial<{
    root: string
    title: string
    list: string
    item: (value: string) => string
    link: (value: string) => string
    indicator: string
  }>
  /**
   * The TOC items with `value` (slug/id) and `depth` (heading level).
   */
  items: toc.TocItem[]
  /**
   * The root margin for the IntersectionObserver.
   * @default "-20px 0px -40% 0px"
   */
  rootMargin?: string
  /**
   * The scroll behavior for auto-scrolling the TOC container.
   * @default "smooth"
   */
  scrollBehavior?: ScrollBehavior
  /**
   * The IntersectionObserver threshold.
   * @default 0
   */
  threshold?: number | number[]
}

export type RootEmits = {
  /**
   * Callback when the active (visible) headings change.
   */
  activeChange: [details: toc.ActiveChangeDetails]
}
