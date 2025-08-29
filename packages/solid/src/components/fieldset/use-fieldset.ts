import { dataAttr } from '@zag-js/dom-query'
import { createEffect, createMemo, createSignal, createUniqueId, mergeProps, onCleanup } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { MaybeAccessor } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
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

export const useFieldset = (props?: MaybeAccessor<UseFieldsetProps>) => {
  const env = useEnvironmentContext()

  const mergedProps = mergeProps({ disabled: false, invalid: false }, runIfFn(props))

  let rootRef: HTMLFieldSetElement | undefined
  const id = mergedProps.id ?? createUniqueId()

  const legendId = `fieldset::${id}::legend`
  const errorTextId = `fieldset::${id}::error-text`
  const helperTextId = `fieldset::${id}::helper-text`

  const [hasErrorText, setHasErrorText] = createSignal(false)
  const [hasHelperText, setHasHelperText] = createSignal(false)

  createEffect(() => {
    const rootNode = rootRef
    if (!rootNode) return

    const checkTextElements = () => {
      const docOrShadowRoot = env().getRootNode() as DocumentFragment
      setHasErrorText(!!docOrShadowRoot.getElementById(errorTextId))
      setHasHelperText(!!docOrShadowRoot.getElementById(helperTextId))
    }

    checkTextElements()

    const win = env().getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    onCleanup(() => observer.disconnect())
  })

  const labelIds: string[] = []

  if (hasErrorText() && mergedProps.invalid) labelIds.push(errorTextId)
  if (hasHelperText()) labelIds.push(helperTextId)

  const getRootProps = () => ({
    ...parts.root.attrs,
    disabled: mergedProps.disabled,
    'data-disabled': dataAttr(mergedProps.disabled),
    'data-invalid': dataAttr(mergedProps.invalid),
    'aria-labelledby': legendId,
    'aria-describedby': labelIds.join(' ') || undefined,
  })

  const getLegendProps = () => ({
    id: legendId,
    ...parts.legend.attrs,
    'data-disabled': dataAttr(mergedProps.disabled),
    'data-invalid': dataAttr(mergedProps.invalid),
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
    refs: {
      rootRef,
    },
    disabled: mergedProps.disabled,
    invalid: mergedProps.invalid,
    getRootProps,
    getLegendProps,
    getHelperTextProps,
    getErrorTextProps,
  }))
}
