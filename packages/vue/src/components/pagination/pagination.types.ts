import type * as pagination from '@zag-js/pagination'

export interface RootProps {
  /**
   * Total number of data items
   */
  count?: number
  /**
   * The initial active page when rendered.
   * Use when you don't need to control the active page of the pagination.
   * @default 1
   */
  defaultPage?: number
  /**
   * The initial number of data items per page when rendered.
   * Use when you don't need to control the page size of the pagination.
   * @default 10
   */
  defaultPageSize?: number
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
   * The controlled active page
   */
  page?: number
  /**
   * The controlled number of data items per page
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
  /**
   * Function to generate href attributes for pagination links.
   * Only used when `type` is set to "link".
   */
  getPageUrl?: (details: pagination.PageUrlDetails) => string
}

export type RootEmits = {
  /**
   * Called when the page number is changed
   */
  pageChange: [details: pagination.PageChangeDetails]
  /**
   * Called when the page size is changed
   */
  pageSizeChange: [details: pagination.PageSizeChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:page': [page: pagination.PageChangeDetails['page']]
  /**
   * The callback fired when the model value changes.
   */
  'update:pageSize': [pageSize: pagination.PageSizeChangeDetails['pageSize']]
}
