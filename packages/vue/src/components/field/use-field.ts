import { ariaAttr, dataAttr } from '@zag-js/dom-query'
import {
  type HTMLAttributes,
  type MaybeRef,
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toValue,
  useId,
} from 'vue'
import { useEnvironmentContext } from '../../providers'
import { DEFAULT_ENVIRONMENT } from '../../providers/environment/use-environment-context'
import { unrefElement } from '../../utils/unref-element'
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

export const useField = (props: MaybeRef<UseFieldProps> = {}) => {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const uid = useId()
  const id = computed(() => toValue(props).id ?? uid)

  const rootRef = ref(null)

  const rootId = computed(() => toValue(props).ids?.control ?? `field::${id.value}`)
  const errorTextId = computed(() => toValue(props).ids?.errorText ?? `field::${id.value}::error-text`)
  const helperTextId = computed(() => toValue(props).ids?.helperText ?? `field::${id.value}::helper-text`)
  const labelId = computed(() => toValue(props).ids?.label ?? `field::${id.value}::label`)

  onMounted(() => {
    const rootNode = unrefElement(rootRef)
    if (!rootNode) return

    const checkTextElements = () => {
      const docOrShadowRoot = env.value.getRootNode() as ShadowRoot | Document
      state.hasErrorText = !!docOrShadowRoot.getElementById(errorTextId.value)
      state.hasHelperText = !!docOrShadowRoot.getElementById(helperTextId.value)
    }

    checkTextElements()

    const win = env.value.getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })

  const getRootProps = () => {
    const values = toValue(props)
    return {
      ...parts.root.attrs,
      id: rootId.value,
      role: 'group',
      'data-disabled': dataAttr(values.disabled),
      'data-invalid': dataAttr(values.invalid),
      'data-readonly': dataAttr(values.readOnly),
    }
  }

  const getLabelProps = () => {
    const values = toValue(props)
    return {
      ...parts.label.attrs,
      id: labelId.value,
      'data-disabled': dataAttr(values.disabled),
      'data-invalid': dataAttr(values.invalid),
      'data-readonly': dataAttr(values.readOnly),
      'data-required': dataAttr(values.required),
      htmlFor: id.value,
    }
  }

  const labelIds = computed(() => {
    const values = toValue(props)
    const ids: string[] = []
    if (state.hasErrorText && values.invalid) ids.push(errorTextId.value)
    if (state.hasHelperText) ids.push(helperTextId.value)
    return ids
  })

  const getControlProps = () => {
    const values = toValue(props)
    return {
      'aria-describedby': labelIds.value.join(' ') || undefined,
      'aria-invalid': ariaAttr(values.invalid),
      'data-invalid': dataAttr(values.invalid),
      'data-required': dataAttr(values.required),
      'data-readonly': dataAttr(values.readOnly),
      id: id.value,
      required: values.required,
      disabled: values.disabled,
      readOnly: values.readOnly,
    }
  }

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

  const getHelperTextProps = () => {
    const values = toValue(props)
    return {
      id: helperTextId.value,
      ...parts.helperText.attrs,
      'data-disabled': dataAttr(values.disabled),
    }
  }

  const getErrorTextProps = (): HTMLAttributes => ({
    id: errorTextId.value,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  const getRequiredIndicatorProps = (): HTMLAttributes => ({
    'aria-hidden': true,
    ...parts.requiredIndicator.attrs,
  })

  return computed(() => {
    const values = toValue(props)
    return {
      ariaDescribedby: labelIds.value.join(' ') || undefined,
      ids: {
        control: id.value,
        label: labelId.value,
        errorText: errorTextId.value,
        helperText: helperTextId.value,
      },
      refs: {
        rootRef,
      },
      disabled: values.disabled,
      invalid: values.invalid,
      readOnly: values.readOnly,
      required: values.required,
      getLabelProps,
      getRootProps,
      getInputProps,
      getTextareaProps,
      getSelectProps,
      getHelperTextProps,
      getErrorTextProps,
      getRequiredIndicatorProps,
    }
  })
}
