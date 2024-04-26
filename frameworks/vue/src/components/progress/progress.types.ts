import type * as progress from '@zag-js/progress'

export interface RootProps {
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
