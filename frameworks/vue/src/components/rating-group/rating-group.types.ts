import type * as ratingGroup from '@zag-js/rating-group'

export interface RatingGroupRootProps {
  /**
   * Whether to allow half stars.
   */
  allowHalf?: boolean
  /**
   * Whether to autofocus the rating.
   */
  autoFocus?: boolean
  /**
   * The total number of ratings.
   */
  count?: number
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the rating is disabled.
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input element.
   */
  form?: string
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the rating. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    hiddenInput: string
    control: string
    rating(id: string): string
  }>
  modelValue?: number
  /**
   * The name attribute of the rating element (used in forms).
   */
  name?: string
  /**
   * Whether the rating is readonly.
   */
  readOnly?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: ratingGroup.IntlTranslations
  /**
   * The current rating value.
   */
  value?: number
}

export type RatingGroupRootEmits = {
  /**
   * Function to be called when the rating value is hovered.
   */
  hoverChange: [details: ratingGroup.HoverChangeDetails]
  /**
   * Function to be called when the rating value changes.
   */
  valueChange: [details: ratingGroup.ValueChangeDetails]
}
