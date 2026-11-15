import type * as toc from '@zag-js/toc'

export interface RootProps {
  /**
   * The controlled active heading ids.
   */
  activeIds?: string[]
  /**
   * Whether to auto-scroll the TOC container so the first active item
   * is visible when active headings change.
   * @default true
   */
  autoScroll?: boolean
  /**
   * The default active heading ids when rendered.
   * Use when you don't need to control the active headings.
   */
  defaultActiveIds?: string[]
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the TOC. Useful for composition.
   */
  ids?: toc.ElementIds
  /**
   * The TOC items with `value` (slug/id) and `depth` (heading level).
   */
  items: toc.TocItem[]
  /**
   * Whether every visible heading can be active at once.
   * When `false`, only the topmost visible heading is active.
   * @default false
   */
  multiple?: boolean
  /**
   * The root margin for the IntersectionObserver.
   * Controls the effective viewport area for determining active headings.
   *
   * @default "-20px 0px -40% 0px"
   */
  rootMargin?: string
  /**
   * The default scroll behavior used when auto-scrolling the TOC container
   * and when scrolling to a heading (via link click or `api.scrollTo`).
   * Can be overridden per-call by passing `behavior` to `api.scrollTo`.
   * @default "smooth"
   */
  scrollBehavior?: ScrollBehavior
  /**
   * Function that returns the scroll container element to observe within.
   * Defaults to the document/viewport.
   */
  scrollEl?: () => HTMLElement | null
  /**
   * The IntersectionObserver threshold. A value of `0` means the heading is
   * active as soon as even one pixel is visible within the root margin area.
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
