import type * as navigationMenu from '@zag-js/navigation-menu'

export interface RootProps {
  /**
   * The delay before the menu closes
   * @default 300
   */
  closeDelay?: number
  /**
   * The default value of the navigation menu.
   * Use when you don't want to control the value of the menu.
   */
  defaultValue?: string
  /**
   * Whether to disable the click trigger
   */
  disableClickTrigger?: boolean
  /**
   * Whether to disable the hover trigger
   */
  disableHoverTrigger?: boolean
  /**
   * Whether to disable the pointer leave close
   */
  disablePointerLeaveClose?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the machine.
   */
  ids?: Partial<{
    root: string
    list: string
    item: string
    trigger: (value: string) => string
    content: (value: string) => string
    viewport: string
  }>
  /**
   * The delay before the menu opens
   * @default 200
   */
  openDelay?: number
  /**
   * The orientation of the navigation menu
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The controlled value of the navigation menu
   */
  value?: string
}

export type RootEmits = {
  /**
   * Function called when the value of the navigation menu changes
   */
  valueChange: [details: navigationMenu.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:value': [value: string]
}
