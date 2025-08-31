import { useEnvironmentContext } from '$lib/providers'
import type { HTMLProps } from '$lib/types'
import { ariaAttr, dataAttr } from '@zag-js/dom-query'
import { type MaybeFunction, ensureProps, runIfFn } from '@zag-js/utils'
import { onMount } from 'svelte'
import { useFieldsetContext } from '../fieldset/use-fieldset-context'
import { parts } from './field.anatomy'

export interface ElementIds {
  root?: string
  control?: string
  label?: string
  errorText?: string
  helperText?: string
}

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

export const useField = (inProps: MaybeFunction<UseFieldProps> = {}) => {
  const fieldset = useFieldsetContext()
  const env = useEnvironmentContext()

  const props = $derived.by<UseFieldProps>(() => {
    const resolvedProps = runIfFn(inProps)
    ensureProps(resolvedProps, ['id'])
    return resolvedProps
  })

  const id = $derived(props.id)
  const ids = $derived(props.ids)

  const disabled = $derived(props.disabled ?? Boolean(fieldset?.().disabled))
  const invalid = $derived(props.invalid ?? false)
  const readOnly = $derived(props.readOnly ?? false)
  const required = $derived(props.required ?? false)

  let hasErrorText = $state(false)
  let hasHelperText = $state(false)

  let rootRef = $state<Element | null>(null)
  const setRootRef = (el: Element | null) => {
    rootRef = el
  }

  const rootId = $derived(ids?.root ?? `field::${id}`)
  const controlId = $derived(ids?.control ?? `field::${id}::control`)
  const errorTextId = $derived(ids?.errorText ?? `field::${id}::error-text`)
  const helperTextId = $derived(ids?.helperText ?? `field::${id}::helper-text`)
  const labelId = $derived(ids?.label ?? `field::${id}::label`)

  const checkTextElements = () => {
    if (!rootRef) return
    const docOrShadowRoot = env().getRootNode() as ShadowRoot | Document
    hasErrorText = !!docOrShadowRoot.getElementById(errorTextId)
    hasHelperText = !!docOrShadowRoot.getElementById(helperTextId)
  }

  onMount(() => {
    checkTextElements()

    if (rootRef) {
      const win = env().getWindow()
      const observer = new win.MutationObserver(checkTextElements)
      observer.observe(rootRef, { childList: true, subtree: true })

      return () => observer.disconnect()
    }
  })

  const labelIds = $derived(() => {
    const ids: string[] = []
    if (hasErrorText && invalid) ids.push(errorTextId)
    if (hasHelperText) ids.push(helperTextId)
    return ids.join(' ') || undefined
  })

  const getRootProps = () =>
    ({
      ...parts.root.attrs,
      id: rootId,
      role: 'group',
      'data-disabled': dataAttr(disabled),
      'data-invalid': dataAttr(invalid),
      'data-readonly': dataAttr(readOnly),
    }) as HTMLProps<'div'>

  const getLabelProps = () =>
    ({
      ...parts.label.attrs,
      id: labelId,
      'data-disabled': dataAttr(disabled),
      'data-invalid': dataAttr(invalid),
      'data-readonly': dataAttr(readOnly),
      'data-required': dataAttr(required),
      for: controlId,
    }) as HTMLProps<'label'>

  const getControlProps = () =>
    ({
      'aria-describedby': labelIds(),
      'aria-invalid': ariaAttr(invalid),
      'data-invalid': dataAttr(invalid),
      'data-required': dataAttr(required),
      'data-readonly': dataAttr(readOnly),
      id: controlId,
      required,
      disabled,
      readOnly,
    }) as HTMLProps<'input'>

  const getInputProps = () =>
    ({
      ...getControlProps(),
      ...parts.input.attrs,
    }) as HTMLProps<'input'>

  const getTextareaProps = () =>
    ({
      ...getControlProps(),
      ...parts.textarea.attrs,
    }) as HTMLProps<'textarea'>

  const getSelectProps = () =>
    ({
      ...getControlProps(),
      ...parts.select.attrs,
    }) as HTMLProps<'select'>

  const getHelperTextProps = () =>
    ({
      id: helperTextId,
      ...parts.helperText.attrs,
      'data-disabled': dataAttr(disabled),
    }) as HTMLProps<'span'>

  const getErrorTextProps = () =>
    ({
      id: errorTextId,
      ...parts.errorText.attrs,
      'aria-live': 'polite',
    }) as HTMLProps<'span'>

  const getRequiredIndicatorProps = () =>
    ({
      'aria-hidden': true,
      ...parts.requiredIndicator.attrs,
    }) as HTMLProps<'span'>

  const api = $derived({
    setRootRef,
    ariaDescribedby: labelIds(),
    ids: {
      root: rootId,
      control: controlId,
      label: labelId,
      errorText: errorTextId,
      helperText: helperTextId,
    },
    disabled,
    invalid,
    readOnly,
    required,
    getRootProps,
    getLabelProps,
    getInputProps,
    getTextareaProps,
    getSelectProps,
    getHelperTextProps,
    getErrorTextProps,
    getRequiredIndicatorProps,
  })

  return () => api
}
