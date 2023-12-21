import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { CollectionItem, Optional } from '../types'
import { useId } from '../utils'

export interface UseComboboxProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<combobox.Context<T>, 'id'>, 'collection'> {
  modelValue?: combobox.Context<T>['value']
}

export interface UseComboboxReturn<T extends CollectionItem>
  extends ComputedRef<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
  emit: CallableFunction,
): UseComboboxReturn<T> => {
  const getRootNode = useEnvironmentContext()

  const { items, itemToString, itemToValue, isItemDisabled, ...comboboxProps } = props
  const context = computed(() => {
    const { modelValue, ...rest } = comboboxProps
    return {
      ...rest,
      value: modelValue,
    }
  })

  const collection = combobox.collection({ items, itemToString, itemToValue, isItemDisabled })

  const [state, send] = useMachine(
    combobox.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      collection,
      onHighlightChange: (details) => {
        emit('highlight-change', details)
      },
      onInputValueChange: (details) => {
        emit('input-value-change', details)
      },
      onOpenChange: (details) => {
        emit('open-change', details)
      },
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )
  return computed(() => combobox.connect(state.value, send, normalizeProps))
}
