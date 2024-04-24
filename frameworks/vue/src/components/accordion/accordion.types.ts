import type * as accordion from '@zag-js/accordion'

export interface AccordionRootProps {
  /**
   * Whether an accordion item can be after it has been expanded.
   * @default false
   */
  collapsible?: boolean
  /**
   * The initial value of the accordion items that are expanded.
   * Use this when you do not need to control the state of the items.
   */
  defaultValue?: string[]
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the accordion items are disabled
   */
  disabled?: boolean
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the accordion. Useful for composition.
   */
  ids?: Partial<{
    root: string
    item(value: string): string
    content(value: string): string
    trigger(value: string): string
  }>
  /**
   * The accordion items that are currently expanded.
   * Use this prop to control the state of the items via v-model.
   */
  modelValue?: string[]
  /**
   * Whether multple accordion items can be expanded at the same time.
   * @default false
   */
  multiple?: boolean
  /**
   *  The orientation of the accordion items.
   *  @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical'
}

export type AccordionRootEmits = {
  /**
   * The callback fired when the focused accordion item changes.
   */
  focusChange: [details: accordion.FocusChangeDetails]
  /**
   * The callback fired when the state of expanded/collapsed accordion items changes.
   */
  valueChange: [details: accordion.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}
