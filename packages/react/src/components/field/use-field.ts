import { ariaAttr, dataAttr } from '@zag-js/dom-query'
import { useId, useMemo, useRef, useState } from 'react'
import { useEnvironmentContext } from '../../providers'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import type { HTMLProps } from '../factory'
import { useFieldsetContext } from '../fieldset/use-fieldset-context'
import { parts } from './field.anatomy'

export interface ElementIds {
  root?: string | undefined
  control?: string | undefined
  label?: string | undefined
  errorText?: string | undefined
  helperText?: string | undefined
}

export interface UseFieldProps {
  /**
   * The id of the field.
   */
  id?: string | undefined
  /**
   * The ids of the field parts.
   */
  ids?: ElementIds | undefined
  /**
   * Indicates whether the field is required.
   */
  required?: boolean | undefined
  /**
   * Indicates whether the field is disabled.
   */
  disabled?: boolean | undefined
  /**
   * Indicates whether the field is invalid.
   */
  invalid?: boolean | undefined
  /**
   * Indicates whether the field is read-only.
   */
  readOnly?: boolean | undefined
}

export type UseFieldReturn = ReturnType<typeof useField>

export const useField = (props: UseFieldProps = {}) => {
  const fieldset = useFieldsetContext()
  const env = useEnvironmentContext()

  const { ids, disabled = Boolean(fieldset?.disabled), invalid = false, readOnly = false, required = false } = props

  const [hasErrorText, setHasErrorText] = useState(false)
  const [hasHelperText, setHasHelperText] = useState(false)

  const uid = useId()
  const id = props.id ?? uid
  const rootRef = useRef<HTMLDivElement>(null)

  const rootId = ids?.control ?? `field::${id}`
  const errorTextId = ids?.errorText ?? `field::${id}::error-text`
  const helperTextId = ids?.helperText ?? `field::${id}::helper-text`
  const labelId = ids?.label ?? `field::${id}::label`

  useSafeLayoutEffect(() => {
    const rootNode = rootRef.current
    if (!rootNode) return

    const checkTextElements = () => {
      const docOrShadowRoot = env.getRootNode() as ShadowRoot | Document
      setHasErrorText(!!docOrShadowRoot.getElementById(errorTextId))
      setHasHelperText(!!docOrShadowRoot.getElementById(helperTextId))
    }

    checkTextElements()

    const win = env.getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [env, errorTextId, helperTextId])

  const labelIds = useMemo(() => {
    const ids: string[] = []
    if (hasErrorText && invalid) ids.push(errorTextId)
    if (hasHelperText) ids.push(helperTextId)
    return ids.join(' ') || undefined
  }, [invalid, errorTextId, helperTextId, hasErrorText, hasHelperText])

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
