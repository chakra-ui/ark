import { getWindow } from '@zag-js/dom-query'
import {
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from 'vue'
import { useId } from '../../utils'
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

export const useFieldset = (props: UseFieldsetProps) => {
  const { disabled, invalid } = props
  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const id = props.id ?? useId()
  const rootRef = ref(null)
  const errorTextId = `fieldset::${id}::error-text`
  const helperTextId = `fieldset::${id}::helper-text`
  const labelId = `fieldset::${id}::label`

  onMounted(() => {
    const rootNode = rootRef.value
    if (!rootNode) return

    const win = getWindow(rootNode)
    const doc = win.document

    const checkTextElements = () => {
      state.hasErrorText = !!doc.getElementById(errorTextId)
      state.hasHelperText = !!doc.getElementById(helperTextId)
    }

    checkTextElements()
    const observer = new win.MutationObserver(checkTextElements)

    observer.observe(rootNode, { childList: true, subtree: true })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })

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

  return computed(() => ({
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
