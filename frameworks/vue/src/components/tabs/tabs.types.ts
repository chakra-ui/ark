import type * as tabs from '@zag-js/tabs'

export interface TabsRootProps {
  /**
   * The activation mode of the tabs. Can be `manual` or `automatic`
   * - `manual`: Tabs are activated when clicked or press `enter` key.
   * - `automatic`: Tabs are activated when receiving focus
   * @default "automatic"
   */
  activationMode?: 'manual' | 'automatic'
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the tabs. Useful for composition.
   */
  ids?: Partial<{ root: string; trigger: string; list: string; content: string; indicator: string }>
  /**
   * Whether the keyboard navigation will loop from last tab to first, and vice versa.
   * @default true
   */
  loopFocus?: boolean
  modelValue?: string
  /**
   * The orientation of the tabs. Can be `horizontal` or `vertical`
   * - `horizontal`: only left and right arrow key navigation will work.
   * - `vertical`: only up and down arrow key navigation will work.
   *
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: tabs.IntlTranslations
  /**
   * The selected tab id
   */
  value?: string
}

export type TabsRootEmits = {
  /**
   * Callback to be called when the focused tab changes
   */
  focusChange: [details: tabs.FocusChangeDetails]
  /**
   * Callback to be called when the selected/active tab changes
   */
  valueChange: [details: tabs.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}
