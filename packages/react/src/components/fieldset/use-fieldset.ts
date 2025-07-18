import { dataAttr } from '@zag-js/dom-query'
import { useId, useMemo, useRef } from 'react'
import { useEnvironmentContext } from '../../providers'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import type { HTMLProps } from '../factory'
import { parts } from './fieldset.anatomy'

export interface UseFieldsetProps {
  /**
   * The id of the fieldset.
   */
  id?: string | undefined
  /**
   * Indicates whether the fieldset is disabled.
   */
  disabled?: boolean | undefined
  /**
   * Indicates whether the fieldset is invalid.
   */
  invalid?: boolean | undefined
}

export type UseFieldsetReturn = ReturnType<typeof useFieldset>

export const useFieldset = (props: UseFieldsetProps = {}) => {
  const { disabled = false, invalid = false } = props

  const env = useEnvironmentContext()

  const hasErrorText = useRef(false)
  const hasHelperText = useRef(false)

  const uid = useId()
  const id = props.id ?? uid
  const rootRef = useRef<HTMLFieldSetElement>(null)

  const errorTextId = `fieldset::${id}::error-text`
  const helperTextId = `fieldset::${id}::helper-text`

  useSafeLayoutEffect(() => {
    const rootNode = rootRef.current
    if (!rootNode) return

    const checkTextElements = () => {
      const docOrShadowRoot = env.getRootNode() as ShadowRoot | Document
      hasErrorText.current = !!docOrShadowRoot.getElementById(errorTextId)
      hasHelperText.current = !!docOrShadowRoot.getElementById(helperTextId)
    }

    checkTextElements()

    const win = env.getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [env, errorTextId, helperTextId])

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
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
        'aria-describedby': labelIds,
      }) as HTMLProps<'fieldset'>,
    [disabled, invalid, labelIds],
  )

  const getLegendProps = useMemo(
    () => () =>
      ({
        ...parts.legend.attrs,
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
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
