import type * as progress from '@zag-js/progress'

export interface ProgressRootProps {
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
   * The maximum allowed value of the progress bar.
   */
  max?: number
  /**
   * The minimum allowed value of the progress bar.
   */
  min?: number
  modelValue?: number
  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: progress.Orientation
  /**
   * The localized messages to use.
   */
  translations?: progress.IntlTranslations
}

export type ProgressRootEmits = {
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number]
}
