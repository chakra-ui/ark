import * as tagsInput from '@zag-js/tags-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './tags-input.types'

export interface UseTagsInputProps extends Optional<Omit<tagsInput.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the tags input
   */
  modelValue?: tagsInput.Props['value']
}

export interface UseTagsInputReturn extends ComputedRef<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (props: MaybeRef<UseTagsInputProps> = {}, emit?: EmitFn<RootEmits>): UseTagsInputReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<tagsInput.Props>(() => {
    const localProps = toValue<UseTagsInputProps>(props)

    return {
      id,
      ids: {
        label: field?.value.ids.label,
        hiddenInput: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      invalid: field?.value.invalid,
      readOnly: field?.value.readOnly,
      required: field?.value.required,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        localProps.onFocusOutside?.(details)
      },
      onHighlightChange: (details) => {
        emit?.('highlightChange', details)
        localProps.onHighlightChange?.(details)
      },
      onInputValueChange: (details) => {
        emit?.('inputValueChange', details)
        emit?.('update:inputValue', details.inputValue)
        localProps.onInputValueChange?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        localProps.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        localProps.onPointerDownOutside?.(details)
      },
      onValueInvalid: (details) => {
        emit?.('valueInvalid', details)
        localProps.onValueInvalid?.(details)
      },
    }
  })

  const service = useMachine(tagsInput.machine, context)
  return computed(() => tagsInput.connect(service, normalizeProps))
}
