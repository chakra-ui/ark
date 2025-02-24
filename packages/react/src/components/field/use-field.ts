import { ariaAttr, dataAttr, getWindow } from '@zag-js/dom-query'
import { useId, useMemo, useRef } from 'react'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import type { HTMLProps } from '../factory'
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

export const useField = (props: UseFieldProps) => {
  const fieldset = useFieldsetContext()
  const { ids, disabled = Boolean(fieldset?.disabled), invalid = false, readOnly = false, required = false } = props

  const hasErrorText = useRef(false)
  const hasHelperText = useRef(false)

  const id = props.id ?? useId()
  const rootRef = useRef<HTMLDivElement>(null)

  const rootId = ids?.control ?? `field::${id}`
  const errorTextId = ids?.errorText ?? `field::${id}::error-text`
  const helperTextId = ids?.helperText ?? `field::${id}::helper-text`
  const labelId = ids?.label ?? `field::${id}::label`

  useSafeLayoutEffect(() => {
    const rootNode = rootRef.current
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      hasErrorText.current = !!doc.getElementById(errorTextId)
      hasHelperText.current = !!doc.getElementById(helperTextId)
    }

    checkTextElements()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [errorTextId, helperTextId])

  const labelIds = useMemo(() => {
    const ids: string[] = []
    if (hasErrorText.current && invalid) ids.push(errorTextId)
    if (hasHelperText.current) ids.push(helperTextId)
    return ids.join(' ') || undefined
  }, [invalid, errorTextId, helperTextId])

  const getRootProps = useMemo(
    () => () =>
      ({
        ...parts.root.attrs,
        id: rootId,
        ref: rootRef,
        role: 'group',
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
        'data-readonly': dataAttr(readOnly),
      }) as HTMLProps<'div'>,
    [disabled, invalid, readOnly, rootId],
  )

  const getLabelProps = useMemo(
    () => () =>
      ({
        ...parts.label.attrs,
        id: labelId,
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
        'data-readonly': dataAttr(readOnly),
        htmlFor: id,
      }) as HTMLProps<'label'>,
    [disabled, invalid, readOnly, id, labelId],
  )

  const getControlProps = useMemo(
    () => () =>
      ({
        'aria-describedby': labelIds,
        'aria-invalid': ariaAttr(invalid),
        'data-invalid': dataAttr(invalid),
        'data-required': dataAttr(required),
        'data-readonly': dataAttr(readOnly),
        id,
        required,
        disabled,
        readOnly,
      }) as HTMLProps<'input'>,
    [labelIds, invalid, required, readOnly, id, disabled],
  )

  const getInputProps = useMemo(
    () => () =>
      ({
        ...getControlProps(),
        ...parts.input.attrs,
      }) as HTMLProps<'input'>,
    [getControlProps],
  )

  const getTextareaProps = useMemo(
    () => () =>
      ({
        ...getControlProps(),
        ...parts.textarea.attrs,
      }) as HTMLProps<'textarea'>,
    [getControlProps],
  )

  const getSelectProps = useMemo(
    () => () =>
      ({
        ...getControlProps(),
        ...parts.select.attrs,
      }) as HTMLProps<'select'>,
    [getControlProps],
  )

  const getHelperTextProps = useMemo(
    () => () =>
      ({
        id: helperTextId,
        ...parts.helperText.attrs,
        'data-disabled': dataAttr(disabled),
      }) as HTMLProps<'span'>,
    [disabled, helperTextId],
  )

  const getErrorTextProps = useMemo(
    () => () =>
      ({
        id: errorTextId,
        ...parts.errorText.attrs,
        'aria-live': 'polite',
      }) as HTMLProps<'span'>,
    [errorTextId],
  )

  const getRequiredIndicatorProps = useMemo(
    () => () =>
      ({
        'aria-hidden': true,
        ...parts.requiredIndicator.attrs,
      }) as HTMLProps<'span'>,
    [],
  )

  return {
    ariaDescribedby: labelIds,
    ids: {
      root: rootId,
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
  }
}
