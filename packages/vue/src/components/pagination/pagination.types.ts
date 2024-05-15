import type * as pagination from '@zag-js/pagination'

export interface RootProps {
  /**
   * Total number of data items
   */
  count: number
  /**
   * The initial page of the pagination when it is first rendered.
   * Use when you do not need to control the state of the pagination.
   */
  defaultPage?: number
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the accordion. Useful for composition.
   */
  ids?: Partial<{
    root: string
    ellipsis(index: number): string
    prevTrigger: string
    nextTrigger: string
    item(page: number): string
  }>
  /**
   * The active page
   * @default 1
   */
  page?: number
  /**
   * Number of data items per page
   * @default 10
   */
  pageSize?: number
  /**
   * Number of pages to show beside active page
   * @default 1
   */
  siblingCount?: number
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: pagination.IntlTranslations
  /**
   * The type of the trigger element
   * @default "button"
   */
  type?: 'button' | 'link'
}

export type RootEmits = {
  /**
   * Called when the page number is changed, and it takes the resulting page number argument
   */
  pageChange: [details: pagination.PageChangeDetails]
}
