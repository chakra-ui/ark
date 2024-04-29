import type * as progress from '@zag-js/progress'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the progress bar. Useful for composition.
   */
  ids?: Partial<{ root: string; track: string; label: string; circle: string }>
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
  orientation?: progress.Orientation
  /**
   * The localized messages to use.
   */
  translations?: progress.IntlTranslations
  /**
   *  The current value of the progress bar.
   */
  value?: number | null
}
