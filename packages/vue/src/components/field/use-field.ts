import { ariaAttr, dataAttr, getWindow } from '@zag-js/dom-query'
import { type HTMLAttributes, computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { parts } from './field.anatomy'
import type { ElementIds } from './field.types'

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
  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const id = computed(() => props.id ?? `field-${Math.random().toString(36).substring(2, 9)}`)
  const rootRef = ref(null)

  const rootId = computed(() => props.ids?.control ?? `field::${id.value}`)
  const errorTextId = computed(() => props.ids?.errorText ?? `field::${id.value}::error-text`)
  const helperTextId = computed(() => props.ids?.helperText ?? `field::${id.value}::helper-text`)
  const labelId = computed(() => props.ids?.label ?? `field::${id.value}::label`)

  onMounted(() => {
    const rootNode = rootRef.value
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      state.hasErrorText = !!doc.getElementById(errorTextId.value)
      state.hasHelperText = !!doc.getElementById(helperTextId.value)
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
    'data-disabled': dataAttr(props.disabled),
    'data-invalid': dataAttr(props.invalid),
    'data-readonly': dataAttr(props.readOnly),
  })

  const getLabelProps = () => ({
    ...parts.label.attrs,
    id: labelId,
    'data-disabled': dataAttr(props.disabled),
    'data-invalid': dataAttr(props.invalid),
    'data-readonly': dataAttr(props.readOnly),
    htmlFor: id,
  })

  const labelIds = computed(() => {
    const ids: string[] = []
    if (state.hasErrorText && props.invalid) ids.push(errorTextId.value)
    if (state.hasHelperText) ids.push(helperTextId.value)
    return ids
  })

  const getControlProps = () => ({
    'aria-describedby': labelIds.value.join(' ') || undefined,
    'aria-invalid': ariaAttr(props.invalid),
    'data-invalid': dataAttr(props.invalid),
    'data-required': dataAttr(props.required),
    'data-readonly': dataAttr(props.readOnly),
    id: id,
    required: props.required,
    disabled: props.disabled,
    readOnly: props.readOnly,
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
    id: errorTextId.value,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  const getRequiredIndicatorProps = (): HTMLAttributes => ({
    'aria-hidden': true,
    ...parts.requiredIndicator.attrs,
  })

  return computed(() => ({
    ariaDescribedby: labelIds.value.join(' ') || undefined,
    ids: {
      control: id,
      label: labelId,
      errorText: errorTextId,
      helperText: helperTextId,
    },
    refs: {
      rootRef,
    },
    disabled: props.disabled,
    invalid: props.invalid,
    readOnly: props.readOnly,
    required: props.required,
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
