import type * as ratingGroup from '@zag-js/rating-group'

export interface RootProps {
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
   * @default 5
   */
  count?: number
  /**
   * The initial value of the rating when rendered.
   * Use when you don't need to control the value of the rating.
   */
  defaultValue?: number
  /**
   * Whether the rating is disabled.
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input element.
   */
  form?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the rating. Useful for composition.
   */
  ids?: Partial<{ root: string; label: string; hiddenInput: string; control: string; item(id: string): string }>
  /**
   * The v-model value of the rating group
   */
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
   * Whether the rating is required.
   */
  required?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: ratingGroup.IntlTranslations
}

export type RootEmits = {
  /**
   * Function to be called when the rating value is hovered.
   */
  hoverChange: [details: ratingGroup.HoverChangeDetails]
  /**
   * Function to be called when the rating value changes.
   */
  valueChange: [details: ratingGroup.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number]
}
