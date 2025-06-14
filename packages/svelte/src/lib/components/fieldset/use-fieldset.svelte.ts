import { useEnvironmentContext } from '$lib/providers'
import type { HTMLProps } from '$lib/types'
import { runIfFn } from '$lib/utils/run-if-fn'
import { dataAttr } from '@zag-js/dom-query'
import { type MaybeFunction, ensureProps } from '@zag-js/utils'
import { onMount } from 'svelte'
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

export const useFieldset = (inProps: MaybeFunction<UseFieldsetProps> = {}) => {
  const props = $derived.by<UseFieldsetProps>(() => {
    const resolvedProps = runIfFn(inProps)
    ensureProps(resolvedProps, ['id'])
    return resolvedProps
  })

  const id = $derived(props.id)

  const disabled = $derived(props.disabled ?? false)
  const invalid = $derived(props.invalid ?? false)

  const env = useEnvironmentContext()

  let hasErrorText = $state(false)
  let hasHelperText = $state(false)

  let rootRef = $state<Element | null>(null)
  const setRootRef = (el: Element | null) => {
    rootRef = el
  }

  const errorTextId = $derived(`fieldset::${id}::error-text`)
  const helperTextId = $derived(`fieldset::${id}::helper-text`)

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
      disabled,
      'data-disabled': dataAttr(disabled),
      'data-invalid': dataAttr(invalid),
      'aria-describedby': labelIds(),
    }) as HTMLProps<'fieldset'>

  const getLegendProps = () =>
    ({
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

  const api = $derived({
    setRootRef,
    disabled,
    invalid,
    getRootProps,
    getLegendProps,
    getHelperTextProps,
    getErrorTextProps,
  })

  return () => api
}
