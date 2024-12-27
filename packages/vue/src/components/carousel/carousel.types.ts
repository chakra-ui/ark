import type * as carousel from '@zag-js/carousel'

export interface RootProps {
  /**
   * Whether to allow scrolling via dragging with mouse
   * @default false
   */
  allowMouseDrag?: boolean
  /**
   * Whether to scroll automatically. The default delay is 4000ms.
   * @default false
   */
  autoplay?: boolean | { delay: number }
  /**
   * The initial page of the carousel when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultPage?: number
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the carousel. Useful for composition.
   */
  ids?: Partial<{
    root: string
    item(index: number): string
    itemGroup: string
    nextTrigger: string
    prevTrigger: string
    indicatorGroup: string
    indicator(index: number): string
  }>
  /**
   * The threshold for determining if an item is in view.
   * @default 0.6
   */
  inViewThreshold?: number | number[]
  /**
   * Whether the carousel should loop around.
   * @default false
   */
  loop?: boolean
  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: import(
    '/Users/christian/Developer/ark/node_modules/@zag-js/types/dist/index',
  ).Orientation
  /**
   * Defines the extra space added around the scrollable area,
   * enabling nearby items to remain partially in view.
   */
  padding?: string
  /**
   * The index of the active page.
   */
  page?: number
  /**
   * The total number of slides.
   * Useful for SSR to render the initial ating the snap points.
   */
  slideCount?: number
  /**
   * The number of slides to scroll at a time.
   *
   * When set to `auto`, the number of slides to scroll is determined by the
   * `slidesPerPage` property.
   *
   * @default "auto"
   */
  slidesPerMove?: number | 'auto'
  /**
   * The number of slides to show at a time.
   * @default 1
   */
  slidesPerPage?: number
  /**
   * The snap type of the item.
   * @default "mandatory"
   */
  snapType?: 'proximity' | 'mandatory'
  /**
   * The amount of space between items.
   * @default "0px"
   */
  spacing?: string
  /**
   * The localized messages to use.
   */
  translations?: carousel.IntlTranslations
}

export type RootEmits = {
  /**
   * Function called when the autoplay status changes.
   */
  autoplayStatusChange: [details: carousel.AutoplayStatusDetails]
  /**
   * Function called when the drag status changes.
   */
  dragStatusChange: [details: carousel.DragStatusDetails]
  /**
   * Function called when the page changes.
   */
  pageChange: [details: carousel.PageChangeDetails]
}
