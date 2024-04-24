import type * as interactOutside from '@zag-js/interact-outside'
import type * as tagsInput from '@zag-js/tags-input'

export interface TagsInputRootProps {
  /**
   * Whether to add a tag when you paste values into the tag input
   */
  addOnPaste?: boolean
  /**
   * Whether to allow tags to exceed max. In this case,
   * we'll attach `data-invalid` to the root
   */
  allowOverflow?: boolean
  /**
   * Whether the input should be auto-focused
   */
  autoFocus?: boolean
  /**
   * The behavior of the tags input when the input is blurred
   * - `"add"`: add the input value as a new tag
   * - `"none"`: do nothing
   * - `"clear"`: clear the input value
   *
   * @default "none"
   */
  blurBehavior?: 'clear' | 'add'
  /**
   * The character that serves has:
   * - event key to trigger the addition of a new tag
   * - character used to split tags when pasting into the input
   *
   * @default ","
   */
  delimiter?: string | RegExp
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the tags input should be disabled
   */
  disabled?: boolean
  /**
   * Whether a tag can be edited after creation.
   * If `true` and focus is on a tag, pressing `Enter`or double clicking will edit the tag.
   */
  editable?: boolean
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
   * The ids of the elements in the tags input. Useful for composition.
   */
  ids?: Partial<{
    root: string
    input: string
    clearBtn: string
    label: string
    control: string
    item(opts: tagsInput.ItemProps): string
    itemDeleteTrigger(opts: tagsInput.ItemProps): string
    itemInput(opts: tagsInput.ItemProps): string
  }>
  /**
   * The tag input's value
   */
  inputValue?: string
  /**
   * Whether the tags input is invalid
   */
  invalid?: boolean
  /**
   * The max number of tags
   */
  max?: number
  /**
   * The max length of the input.
   */
  maxLength?: number
  modelValue?: string[]
  /**
   * The name attribute for the input. Useful for form submissions
   */
  name?: string
  /**
   * Whether the tags input should be read-only
   */
  readOnly?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: tagsInput.IntlTranslations
  /**
   * Returns a boolean that determines whether a tag can be added.
   * Useful for preventing duplicates or invalid tag values.
   */
  validate?: (details: ValidateArgs) => boolean
  /**
   * The tag values
   */
  value?: string[]
}

export type TagsInputRootEmits = {
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: interactOutside.FocusOutsideEvent]
  /**
   * Callback fired when a tag is highlighted by pointer or keyboard navigation
   */
  highlightChange: [details: tagsInput.HighlightChangeDetails]
  /**
   * Callback fired when the input value is updated
   */
  inputValueChange: [details: tagsInput.InputValueChangeDetails]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: interactOutside.InteractOutsideEvent]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: interactOutside.PointerDownOutsideEvent]
  /**
   * Callback fired when the tag values is updated
   */
  valueChange: [details: tagsInput.ValueChangeDetails]
  /**
   * Callback fired when the max tag count is reached or the `validateTag` function returns `false`
   */
  valueInvalid: [details: tagsInput.ValidityChangeDetails]
}
