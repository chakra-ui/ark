import { ariaAttr, dataAttr, getWindow } from '@zag-js/dom-query'
import { type HTMLAttributes, computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { parts } from './field.anatomy'
import type { ElementIds } from './field.types'
import { useId } from '../../utils'

export interface UseFieldProps {
  /**
   * The id of the field.
   */
  id?: string
  /**
   * The ids of the field parts.
   */
  ids?: ElementIds
  /**
   * Indicates whether the field is required.
   */
  required?: boolean
  /**
   * Indicates whether the field is disabled.
   */
  disabled?: boolean
  /**
   * Indicates whether the field is invalid.
   */
  invalid?: boolean
  /**
   * Indicates whether the field is read-only.
   */
  readOnly?: boolean
}

export type UseFieldReturn = ReturnType<typeof useField>

export const useField = (props: UseFieldProps) => {
  const { required, disabled, invalid, readOnly, ids } = props

  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const id = useId(props.id)
  const rootRef = ref(null)

  const rootId = ids?.control ?? `field::${id}`
  const errorTextId = ids?.errorText ?? `field::${id}::error-text`
  const helperTextId = ids?.helperText ?? `field::${id}::helper-text`
  const labelId = ids?.label ?? `field::${id}::label`

  onMounted(() => {
    const rootNode = rootRef.value
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      state.hasErrorText = !!doc.getElementById(errorTextId)
      state.hasHelperText = !!doc.getElementById(helperTextId)
    }

    checkTextElements()
    const observer = new win.MutationObserver(checkTextElements)

    observer.observe(rootNode, { childList: true, subtree: true })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })

  const getRootProps = () => ({
    ...parts.root.attrs,
    id: rootId,
    role: 'group',
    'data-disabled': dataAttr(disabled),
    'data-invalid': dataAttr(invalid),
    'data-readonly': dataAttr(readOnly),
  })

  const getLabelProps = () => ({
    ...parts.label.attrs,
    id: labelId,
    'data-disabled': dataAttr(disabled),
    'data-invalid': dataAttr(invalid),
    'data-readonly': dataAttr(readOnly),
    htmlFor: id,
  })

  const labelIds: string[] = []

  if (state.hasErrorText && invalid) labelIds.push(errorTextId)
  if (state.hasHelperText) labelIds.push(helperTextId)

  const getControlProps = () => ({
    'aria-describedby': labelIds.join(' ') || undefined,
    'aria-invalid': ariaAttr(invalid),
    'data-invalid': dataAttr(invalid),
    'data-required': dataAttr(required),
    'data-readonly': dataAttr(readOnly),
    id,
    required,
    disabled,
    readOnly,
  })

  const getInputProps = () => ({
    ...getControlProps(),
    ...parts.input.attrs,
  })

  const getTextareaProps = () => ({
    ...getControlProps(),
    ...parts.textarea.attrs,
  })

  const getSelectProps = () => ({
    ...getControlProps(),
    ...parts.select.attrs,
  })

  const getHelperTextProps = () => ({
    id: helperTextId,
    ...parts.helperText.attrs,
  })

  const getErrorTextProps = (): HTMLAttributes => ({
    id: errorTextId,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  const getRequiredIndicatorProps = (): HTMLAttributes => ({
    'aria-hidden': true,
    ...parts.requiredIndicator.attrs,
  })

  return computed(() => ({
    ariaDescribedby: labelIds.join(' '),
    ids: {
      control: id,
      label: labelId,
      errorText: errorTextId,
      helperText: helperTextId,
    },
    refs: {
      rootRef,
    },
    disabled,
    invalid,
    readOnly,
    required,
    getLabelProps,
    getRootProps,
    getInputProps,
    getTextareaProps,
    getSelectProps,
    getHelperTextProps,
    getErrorTextProps,
    getRequiredIndicatorProps,
  }))
}
