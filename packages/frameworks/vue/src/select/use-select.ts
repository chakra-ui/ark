import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { CollectionItem, Optional } from '../types'
import { useId } from '../utils'

export interface UseSelectProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<select.Context<T>, 'id'>, 'collection'> {
  modelValue?: select.Context<T>['value']
}

export interface UseSelectReturn<T extends CollectionItem>
  extends ComputedRef<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
  emit: CallableFunction,
): UseSelectReturn<T> => {
  const getRootNode = useEnvironmentContext()

  const { items, itemToString, itemToValue, isItemDisabled, ...selectProps } = props
  const context = computed(() => {
    const { modelValue, ...rest } = selectProps
    return {
      ...rest,
      value: modelValue,
    }
  })
  const collection = select.collection({ items, itemToString, itemToValue, isItemDisabled })

  const [state, send] = useMachine(
    select.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      collection,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onHighlightChange: (details) => {
        emit('highlight-change', details)
      },
      onOpenChange: (details) => {
        emit('open-change', details)
      },
    }),
    { context },
  )
  return computed(() => select.connect(state.value, send, normalizeProps))
}
