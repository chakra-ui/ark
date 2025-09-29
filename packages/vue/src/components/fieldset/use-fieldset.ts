import { dataAttr } from '@zag-js/dom-query'
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
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers'
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

export const useFieldset = (props: MaybeRef<UseFieldsetProps> = {}) => {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const state = reactive({
    hasErrorText: false,
    hasHelperText: false,
  })

  const rootRef = ref(null)

  const uuid = useId()

  const ids = computed(() => {
    const fieldsetProps = toValue<UseFieldsetProps>(props)
    const id = fieldsetProps.id ?? uuid
    return {
      labelId: `fieldset::${id}::label`,
      errorTextId: `fieldset::${id}::error-text`,
      helperTextId: `fieldset::${id}::helper-text`,
    }
  })

  onMounted(() => {
    const rootNode = rootRef.value
    if (!rootNode) return

    const checkTextElements = () => {
      const { errorTextId, helperTextId } = ids.value
      const docOrShadowRoot = env.value.getRootNode() as ShadowRoot | Document
      state.hasErrorText = !!docOrShadowRoot.getElementById(errorTextId)
      state.hasHelperText = !!docOrShadowRoot.getElementById(helperTextId)
    }

    checkTextElements()

    const win = env.value.getWindow()
    const observer = new win.MutationObserver(checkTextElements)
    observer.observe(rootNode, { childList: true, subtree: true })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })

  return computed(() => {
    const { disabled, invalid } = toValue<UseFieldsetProps>(props)
    const { labelId, errorTextId, helperTextId } = ids.value

    const labelIds: string[] = []
    if (state.hasErrorText && invalid) labelIds.push(errorTextId)
    if (state.hasHelperText) labelIds.push(helperTextId)

    const getRootProps = () =>
      ({
        ...parts.root.attrs,
        disabled,
        'data-disabled': dataAttr(!!disabled),
        'data-invalid': dataAttr(invalid),
        'aria-labelledby': labelId,
        'aria-describedby': labelIds.join(' '),
      }) as FieldsetHTMLAttributes

    const getLegendProps = () => ({
      id: labelId,
      ...parts.legend.attrs,
      'data-disabled': dataAttr(!!disabled),
      'data-invalid': dataAttr(invalid),
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
