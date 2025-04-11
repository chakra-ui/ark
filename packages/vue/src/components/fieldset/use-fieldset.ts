import { getWindow } from '@zag-js/dom-query'
import {
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  type MaybeRef,
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toValue,
  useId,
} from 'vue'
import { parts } from './fieldset.anatomy'

export interface UseFieldsetProps {
  /**
   * The id of the fieldset.
   */
  id?: string
  /**
   * Indicates whether the fieldset is disabled.
   */
  disabled?: boolean | 'true' | 'false'
  /**
   * Indicates whether the fieldset is invalid.
   */
  invalid?: boolean
}

export type UseFieldsetReturn = ReturnType<typeof useFieldset>

export const useFieldset = (props: MaybeRef<UseFieldsetProps>) => {
  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const rootRef = ref(null)
  let observer: MutationObserver | null = null

  onMounted(() => {
    const rootNode = rootRef.value
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      const fieldsetProps = toValue<UseFieldsetProps>(props)
      const id = fieldsetProps.id ?? useId()
      const errorTextId = `fieldset::${id}::error-text`
      const helperTextId = `fieldset::${id}::helper-text`

      state.hasErrorText = !!doc.getElementById(errorTextId)
      state.hasHelperText = !!doc.getElementById(helperTextId)
    }

    checkTextElements()
    observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return computed(() => {
    const fieldsetProps = toValue<UseFieldsetProps>(props)
    const { disabled, invalid } = fieldsetProps

    const id = fieldsetProps.id ?? useId()
    const errorTextId = `fieldset::${id}::error-text`
    const helperTextId = `fieldset::${id}::helper-text`
    const labelId = `fieldset::${id}::label`

    const labelIds: string[] = []
    if (state.hasErrorText && invalid) labelIds.push(errorTextId)
    if (state.hasHelperText) labelIds.push(helperTextId)

    const getRootProps = () =>
      ({
        ...parts.root.attrs,
        disabled,
        'data-disabled': disabled ? 'true' : undefined,
        'data-invalid': invalid ? 'true' : undefined,
        'aria-describedby': labelIds.join(' '),
      }) as FieldsetHTMLAttributes

    const getLegendProps = () => ({
      id: labelId,
      ...parts.legend.attrs,
      'data-disabled': disabled ? 'true' : undefined,
      'data-invalid': invalid ? 'true' : undefined,
    })

    const getHelperTextProps = () => ({
      id: helperTextId,
      ...parts.helperText.attrs,
    })

    const getErrorTextProps = (): HTMLAttributes => ({
      id: errorTextId,
      ...parts.errorText.attrs,
      'aria-live': 'polite',
    })

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
  })
}
