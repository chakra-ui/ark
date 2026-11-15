import type * as passwordInput from '@zag-js/password-input'

export interface RootProps {
  /**
   * The autocomplete attribute for the password input.
   * @default "current-password"
   */
  autoComplete?: 'current-password' | 'new-password'
  /**
   * The default visibility of the password input.
   */
  defaultVisible?: boolean
  /**
   * Whether the password input is disabled.
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the password input parts
   */
  ids?: passwordInput.ElementIds
  /**
   * When `true`, the input will ignore password managers.
   *
   * **Only works for the following password managers**
   * - 1Password, LastPass, Bitwarden, Dashlane, Proton Pass
   */
  ignorePasswordManagers?: boolean
  /**
   * The invalid state of the password input.
   */
  invalid?: boolean
  /**
   * The name of the password input.
   */
  name?: string
  /**
   * Whether the password input is read only.
   */
  readOnly?: boolean
  /**
   * Whether the password input is required.
   */
  required?: boolean
  /**
   * The localized messages to use.
   */
  translations?: passwordInput.IntlTranslations
  /**
   * Whether the password input is visible.
   */
  visible?: boolean
}

export type RootEmits = {
  /**
   * Function called when the visibility changes.
   */
  visibilityChange: [details: passwordInput.VisibilityChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:visible': [visible: boolean]
}
