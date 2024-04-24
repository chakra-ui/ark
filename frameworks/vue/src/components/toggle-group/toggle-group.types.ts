import type * as toggleGroup from '@zag-js/toggle-group'

export interface ToggleGroupRootProps {
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the toggle. Useful for composition.
   */
  ids?: Partial<{ root: string; toggle(value: string): string }>
  /**
   * Whether to loop focus inside the toggle group.
   */
  loopFocus?: boolean
  modelValue?: string[]
  /**
   * Whether to allow multiple toggles to be selected.
   */
  multiple?: boolean
  /**
   * The orientation of the toggle group.
   */
  orientation?: toggleGroup.Orientation
  /**
   *  Whether to use roving tab index to manage focus.
   */
  rovingFocus?: boolean
  /**
   * The values of the toggles in the group.
   */
  value?: string[]
}

export type ToggleGroupRootEmits = {
  /**
   * Function to call when the toggle is clicked.
   */
  valueChange: [details: toggleGroup.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}
