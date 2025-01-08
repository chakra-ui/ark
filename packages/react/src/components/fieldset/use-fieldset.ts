import { getWindow } from '@zag-js/dom-query'
import { useId, useMemo, useRef } from 'react'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import type { HTMLProps } from '../factory'
import { parts } from './fieldset.anatomy'

export interface UseFieldsetProps {
  /**
   * The id of the fieldset.
   */
  id?: string
  /**
   * Indicates whether the fieldset is disabled.
   */
  disabled?: boolean
  /**
   * Indicates whether the fieldset is invalid.
   */
  invalid?: boolean
}

export type UseFieldsetReturn = ReturnType<typeof useFieldset>

export const useFieldset = (props: UseFieldsetProps) => {
  const { disabled = false, invalid = false } = props
  const hasErrorText = useRef(false)
  const hasHelperText = useRef(false)

  const id = props.id ?? useId()
  const rootRef = useRef<HTMLFieldSetElement>(null)

  const errorTextId = `fieldset::${id}::error-text`
  const helperTextId = `fieldset::${id}::helper-text`

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
        ref: rootRef,
        disabled,
        'data-disabled': disabled ? 'true' : undefined,
        'data-invalid': invalid ? 'true' : undefined,
        'aria-describedby': labelIds,
      }) as HTMLProps<'fieldset'>,
    [disabled, invalid, labelIds],
  )

  const getLegendProps = useMemo(
    () => () =>
      ({
        ...parts.legend.attrs,
        'data-disabled': disabled ? 'true' : undefined,
        'data-invalid': invalid ? 'true' : undefined,
      }) as HTMLProps<'legend'>,
    [disabled, invalid],
  )

  const getHelperTextProps = useMemo(
    () => () =>
      ({
        id: helperTextId,
        ...parts.helperText.attrs,
      }) as HTMLProps<'span'>,
    [helperTextId],
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

  return {
    refs: {
      rootRef,
    },
    disabled,
    invalid,
    getRootProps,
    getLegendProps,
    getHelperTextProps,
    getErrorTextProps,
  }
}
