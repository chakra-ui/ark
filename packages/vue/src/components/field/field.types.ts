import type { ElementIds, ValidateDetails, ValidateResult, ValidationMode, ValidityChangeDetails } from '@zag-js/field'

export interface RootProps {
  /**
   * Whether the field is disabled. Also inherited from a surrounding native `<fieldset disabled>`.
   */
  disabled?: boolean
  /**
   * Whether the field's value has been changed from its initial value.
   * Useful when the field state is controlled by an external library.
   */
  dirty?: boolean
  /**
   * Errors from outside the field, such as a server response. They mark the field invalid
   * until the user changes the value, and show again when different errors are passed or the form is submitted.
   */
  errors?: string | string[]
  /**
   * The id of the field.
   */
  id?: string
  /**
   * The ids of the field parts.
   */
  ids?: ElementIds
  /**
   * Whether the field is invalid, regardless of computed validity.
   */
  invalid?: boolean
  /**
   * Whether the field is read-only.
   */
  readOnly?: boolean
  /**
   * Whether the field is required.
   */
  required?: boolean
  /**
   * The item whose control the field tracks, for fields composed of multiple controls.
   */
  target?: string
  /**
   * Whether the field has been touched.
   * Useful when the field state is controlled by an external library.
   */
  touched?: boolean
  /**
   * Custom validation, run against the value and the native validity snapshot.
   * May return a promise; a newer validation run supersedes an in-flight one.
   */
  validate?: (details: ValidateDetails) => ValidateResult | Promise<ValidateResult>
  /**
   * When validation results become visible.
   * @default "onSubmit"
   */
  validationMode?: ValidationMode
}

export type RootEmits = {
  /**
   * Called when the committed validity changes.
   */
  validityChange: [details: ValidityChangeDetails]
}
