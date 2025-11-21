import { dataAttr } from '@zag-js/dom-query'
import { useId, useRef, useState } from 'react'
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

  const [textElements, setTextElements] = useState({ hasErrorText: false, hasHelperText: false })

  const uid = useId()
  const id = props.id ?? uid
  const rootRef = useRef<HTMLFieldSetElement>(null)

  const legendId = `fieldset::${id}::legend`
  const errorTextId = `fieldset::${id}::error-text`
  const helperTextId = `fieldset::${id}::helper-text`

  useSafeLayoutEffect(() => {
    const rootNode = rootRef.current
    if (!rootNode) return

    const checkTextElements = () => {
      const docOrShadowRoot = env.getRootNode() as ShadowRoot | Document
      const hasErrorText = !!docOrShadowRoot.getElementById(errorTextId)
      const hasHelperText = !!docOrShadowRoot.getElementById(helperTextId)
      setTextElements({ hasErrorText, hasHelperText })
    }

    checkTextElements()

    const win = env.getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [env, errorTextId, helperTextId])

  const ids: string[] = []
  if (textElements.hasErrorText && invalid) ids.push(errorTextId)
  if (textElements.hasHelperText) ids.push(helperTextId)
  const labelIds = ids.length > 0 ? ids.join(' ') : undefined

  const getRootProps = () =>
    ({
      ...parts.root.attrs,
      ref: rootRef,
      disabled,
      'data-disabled': dataAttr(disabled),
      'data-invalid': dataAttr(invalid),
      'aria-labelledby': legendId,
      'aria-describedby': labelIds,
    }) as HTMLProps<'fieldset'>

  const getLegendProps = () =>
    ({
      id: legendId,
      ...parts.legend.attrs,
      'data-disabled': dataAttr(disabled),
      'data-invalid': dataAttr(invalid),
    }) as HTMLProps<'legend'>

  const getHelperTextProps = () =>
    ({
      id: helperTextId,
      ...parts.helperText.attrs,
    }) as HTMLProps<'span'>

  const getErrorTextProps = () =>
    ({
      id: errorTextId,
      ...parts.errorText.attrs,
      'aria-live': 'polite',
    }) as HTMLProps<'span'>

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
