import type * as progress from '@zag-js/progress'

export interface RootProps {
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
  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/types/dist/index').Orientation
  /**
   * The localized messages to use.
   */
  translations?: progress.IntlTranslations
  /**
   *  The current value of the progress bar.
   */
  value?: number | null
}
