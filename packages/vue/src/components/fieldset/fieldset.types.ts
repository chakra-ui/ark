import type { ElementIds } from '@zag-js/fieldset'

export interface RootProps {
  /**
   * Whether the fieldset is disabled. Native `<fieldset disabled>` semantics carry the disabled
   * state to all descendant form controls.
   */
  disabled?: boolean | 'true' | 'false'
  /**
   * The id of the fieldset.
   */
  id?: string
  /**
   * The ids of the fieldset parts.
   */
  ids?: ElementIds
  /**
   * Whether the fieldset is invalid. Not inherited by descendant fields,
   * but their controls are described by the fieldset's error text.
   */
  invalid?: boolean
}
