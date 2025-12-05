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
import { unrefElement } from '../../utils/unref-element'
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
      legendId: `fieldset::${id}::legend`,
      errorTextId: `fieldset::${id}::error-text`,
      helperTextId: `fieldset::${id}::helper-text`,
    }
  })

  onMounted(() => {
    const rootNode = unrefElement(rootRef)
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
    const { legendId, errorTextId, helperTextId } = ids.value

    const describedByIds: string[] = []
    if (state.hasErrorText && invalid) describedByIds.push(errorTextId)
    if (state.hasHelperText) describedByIds.push(helperTextId)
    const describedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined

    const getRootProps = () =>
      ({
        ...parts.root.attrs,
        disabled,
        'data-disabled': dataAttr(!!disabled),
        'data-invalid': dataAttr(invalid),
        'aria-labelledby': legendId,
        'aria-describedby': describedBy,
      }) as FieldsetHTMLAttributes

    const getLegendProps = () => ({
      id: legendId,
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
      ids: {
        legend: legendId,
        errorText: errorTextId,
        helperText: helperTextId,
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
