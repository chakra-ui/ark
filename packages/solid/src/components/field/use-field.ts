import { ariaAttr, dataAttr, getWindow } from '@zag-js/dom-query'
import { createEffect, createMemo, createSignal, createUniqueId, onCleanup } from 'solid-js'
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

export const useField = (props: UseFieldProps) => {
  const fieldset: UseFieldsetReturn | undefined = useFieldsetContext()

  const {
    ids,
    disabled = Boolean(fieldset?.().disabled),
    invalid = false,
    readOnly = false,
    required = false,
  } = props

  const [hasErrorText, setHasErrorText] = createSignal(false)
  const [hasHelperText, setHasHelperText] = createSignal(false)

  const id = props.id ?? createUniqueId()
  let rootRef: HTMLDivElement | undefined

  const rootId = ids?.control ?? `field::${id}`
  const errorTextId = ids?.errorText ?? `field::${id}::error-text`
  const helperTextId = ids?.helperText ?? `field::${id}::helper-text`
  const labelId = ids?.label ?? `field::${id}::label`

  createEffect(() => {
    const rootNode = rootRef
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      setHasErrorText(!!doc.getElementById(errorTextId))
      setHasHelperText(!!doc.getElementById(helperTextId))
    }

    checkTextElements()
    const observer = new win.MutationObserver(checkTextElements)

    observer.observe(rootNode, { childList: true, subtree: true })

    onCleanup(() => observer.disconnect())
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

  if (hasErrorText() && invalid) labelIds.push(errorTextId)
  if (hasHelperText()) labelIds.push(helperTextId)

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

  const getErrorTextProps = () => ({
    id: errorTextId,
    ...parts.errorText.attrs,
    'aria-live': 'polite',
  })

  return createMemo(() => ({
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
  }))
}
