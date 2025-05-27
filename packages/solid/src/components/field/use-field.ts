import { ariaAttr, dataAttr } from '@zag-js/dom-query'
import { createMemo, createSignal, createUniqueId, mergeProps, onCleanup, onMount } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { MaybeAccessor } from '../../types'
import { useFieldsetContext } from '../fieldset'
import type { UseFieldsetReturn } from '../fieldset/use-fieldset'
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

export const useField = (props?: MaybeAccessor<UseFieldProps>) => {
  const fieldset: UseFieldsetReturn | undefined = useFieldsetContext()
  const env = useEnvironmentContext()

  const fieldProps = mergeProps(
    { disabled: Boolean(fieldset?.().disabled), required: false, invalid: false, readOnly: false },
    props,
  )

  const [hasErrorText, setHasErrorText] = createSignal(false)
  const [hasHelperText, setHasHelperText] = createSignal(false)

  const id = fieldProps.id ?? createUniqueId()
  const [rootRef, setRootRef] = createSignal<HTMLDivElement | undefined>(undefined)

  const rootId = fieldProps.ids?.control ?? `field::${id}`
  const errorTextId = fieldProps.ids?.errorText ?? `field::${id}::error-text`
  const helperTextId = fieldProps.ids?.helperText ?? `field::${id}::helper-text`
  const labelId = fieldProps.ids?.label ?? `field::${id}::label`

  onMount(() => {
    const rootNode = rootRef()
    if (!rootNode) return

    const checkTextElements = () => {
      const docOrShadowRoot = env().getRootNode() as ShadowRoot | Document
      setHasErrorText(!!docOrShadowRoot.getElementById(errorTextId))
      setHasHelperText(!!docOrShadowRoot.getElementById(helperTextId))
    }

    checkTextElements()

    const win = env().getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    onCleanup(() => observer.disconnect())
  })

  const getRootProps = () => ({
    ...parts.root.attrs,
    id: rootId,
    role: 'group',
    'data-disabled': dataAttr(fieldProps.disabled),
    'data-invalid': dataAttr(fieldProps.invalid),
    'data-readonly': dataAttr(fieldProps.readOnly),
  })

  const getLabelProps = () => ({
    ...parts.label.attrs,
    id: labelId,
    'data-disabled': dataAttr(fieldProps.disabled),
    'data-invalid': dataAttr(fieldProps.invalid),
    'data-readonly': dataAttr(fieldProps.readOnly),
    htmlFor: id,
  })

  const labelIds = createMemo(() => {
    const ids: string[] = []
    if (hasErrorText() && fieldProps.invalid) ids.push(errorTextId)
    if (hasHelperText()) ids.push(helperTextId)
    return ids
  })

  const getControlProps = () => ({
    'aria-describedby': labelIds().join(' ') || undefined,
    'aria-invalid': ariaAttr(fieldProps.invalid),
    'data-invalid': dataAttr(fieldProps.invalid),
    'data-required': dataAttr(fieldProps.required),
    'data-readonly': dataAttr(fieldProps.readOnly),
    id,
    required: fieldProps.required,
    disabled: fieldProps.disabled,
    readOnly: fieldProps.readOnly || undefined,
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
    'data-disabled': dataAttr(fieldProps.disabled),
  })

  const getErrorTextProps = () => ({
    id: errorTextId,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  const getRequiredIndicatorProps = () => ({
    'aria-hidden': true,
    ...parts.requiredIndicator.attrs,
  })

  return createMemo(() => ({
    ariaDescribedby: labelIds().join(' '),
    ids: {
      control: id,
      label: labelId,
      errorText: errorTextId,
      helperText: helperTextId,
    },
    refs: {
      rootRef: setRootRef,
    },
    disabled: fieldProps.disabled,
    invalid: fieldProps.invalid,
    readOnly: fieldProps.readOnly,
    required: fieldProps.required,
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
