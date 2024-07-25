import { getWindow } from '@zag-js/dom-query'
import { createEffect, createMemo, createSignal, createUniqueId, onCleanup } from 'solid-js'
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
  let rootRef: HTMLFieldSetElement | undefined
  const id = props.id ?? createUniqueId()

  const errorTextId = `fieldset::${id}::error-text`
  const helperTextId = `fieldset::${id}::helper-text`

  const [hasErrorText, setHasErrorText] = createSignal(false)
  const [hasHelperText, setHasHelperText] = createSignal(false)

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

  const labelIds: string[] = []

  if (hasErrorText() && invalid) labelIds.push(errorTextId)
  if (hasHelperText()) labelIds.push(helperTextId)

  const getRootProps = () => ({
    ...parts.root.attrs,
    disabled,
    'data-disabled': dataAttr(disabled),
    'data-invalid': dataAttr(invalid),
    'aria-describedby': labelIds.join(' ') || undefined,
  })

  const getLegendProps = () => ({
    ...parts.legend.attrs,
    'data-disabled': dataAttr(disabled),
    'data-invalid': dataAttr(invalid),
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
    disabled,
    invalid,
    getRootProps,
    getLegendProps,
    getHelperTextProps,
    getErrorTextProps,
  }))
}

type Booleanish = boolean | 'true' | 'false'
const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish
