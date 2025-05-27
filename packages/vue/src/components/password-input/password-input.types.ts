import type * as passwordInput from '@zag-js/password-input'

export interface RootProps {
  /**
   * The autocomplete attribute for the input
   */
  autoComplete?: passwordInput.Props['autoComplete']
  /**
   * Whether the password is visible by default
   */
  defaultVisible?: boolean
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the password input. Useful for composition.
   */
  ids?: passwordInput.Props['ids']
  /**
   * Whether to ignore password managers
   */
  ignorePasswordManagers?: boolean
  /**
   * Whether the input is in an invalid state
   */
  invalid?: boolean
  /**
   * The name attribute for the input
   */
  name?: string
  /**
   * Whether the input is read-only
   */
  readOnly?: boolean
  /**
   * Whether the input is required
   */
  required?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: passwordInput.IntlTranslations
  /**
   * Whether the password is visible
   */
  visible?: boolean
}

export type RootEmits = {
  /**
   * Function called when the visibility changes
   */
  visibilityChange: [details: passwordInput.VisibilityChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:visible': [visible: boolean]
}
