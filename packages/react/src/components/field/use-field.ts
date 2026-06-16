'use client'

import { ariaAttr, dataAttr } from '@zag-js/dom-query'
import { useId, useMemo, useRef, useState } from 'react'
import { useEnvironmentContext } from '../../providers/index.ts'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect.ts'
import type { HTMLProps } from '../factory.ts'
import { useFieldsetContext } from '../fieldset/use-fieldset-context.ts'
import { parts } from './field.anatomy.ts'

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
  /**
   * The target field item value the label should point to.
   */
  target?: string | undefined
}

export type UseFieldReturn = ReturnType<typeof useField>

export const useField = (props: UseFieldProps = {}) => {
  const fieldset = useFieldsetContext()
  const env = useEnvironmentContext()

  const {
    ids,
    target,
    disabled = Boolean(fieldset?.disabled),
    invalid = false,
    readOnly = false,
    required = false,
  } = props

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

  const getRootProps = useMemo(
    () => () =>
      ({
        ...parts.root.attrs(id),
        id: rootId,
        ref: rootRef,
        role: 'group',
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
        'data-readonly': dataAttr(readOnly),
      }) as HTMLProps<'div'>,
    [disabled, invalid, readOnly, rootId, id],
  )

  const targetControlId = target ? `field::${id}::item::${target}` : undefined

  const getLabelProps = useMemo(
    () => () =>
      ({
        ...parts.label.attrs(id),
        id: labelId,
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
        'data-readonly': dataAttr(readOnly),
        'data-required': dataAttr(required),
        htmlFor: targetControlId ?? id,
      }) as HTMLProps<'label'>,
    [disabled, invalid, readOnly, required, id, labelId, targetControlId],
  )

  const errorMessageId = hasErrorText && invalid ? errorTextId : undefined

  const getControlProps = useMemo(
    () => () =>
      ({
        'aria-describedby': hasHelperText ? helperTextId : undefined,
        'aria-errormessage': errorMessageId,
        'aria-invalid': ariaAttr(invalid),
        'data-invalid': dataAttr(invalid),
        'data-required': dataAttr(required),
        'data-readonly': dataAttr(readOnly),
        id,
        required,
        disabled,
        readOnly,
      }) as HTMLProps<'input'>,
    [invalid, hasHelperText, helperTextId, required, readOnly, id, errorMessageId, disabled],
  )

  const getInputProps = useMemo(
    () => () =>
      ({
        ...getControlProps(),
        ...parts.input.attrs(id),
      }) as HTMLProps<'input'>,
    [getControlProps, id],
  )

  const getTextareaProps = useMemo(
    () => () =>
      ({
        ...getControlProps(),
        ...parts.textarea.attrs(id),
      }) as HTMLProps<'textarea'>,
    [getControlProps, id],
  )

  const getSelectProps = useMemo(
    () => () =>
      ({
        ...getControlProps(),
        ...parts.select.attrs(id),
      }) as HTMLProps<'select'>,
    [getControlProps, id],
  )

  const getHelperTextProps = useMemo(
    () => () =>
      ({
        id: helperTextId,
        ...parts.helperText.attrs(id),
        'data-disabled': dataAttr(disabled),
      }) as HTMLProps<'span'>,
    [disabled, helperTextId, id],
  )

  const getErrorTextProps = useMemo(
    () => () =>
      ({
        id: errorTextId,
        ...parts.errorText.attrs(id),
        'aria-live': 'polite',
      }) as HTMLProps<'span'>,
    [errorTextId, id],
  )

  const getRequiredIndicatorProps = useMemo(
    () => () =>
      ({
        'aria-hidden': true,
        ...parts.requiredIndicator.attrs(id),
      }) as HTMLProps<'span'>,
    [id],
  )

  return {
    ariaDescribedby: hasHelperText ? helperTextId : undefined,
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
