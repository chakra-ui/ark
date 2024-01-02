import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, watch, type ComputedRef } from 'vue'
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
  const context = computed(() => {
    const { items, itemToString, itemToValue, isItemDisabled, modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    select.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      collection: select.collection({
        items: props.items,
        itemToString: props.itemToString,
        itemToValue: props.itemToValue,
        isItemDisabled: props.isItemDisabled,
      }),
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

  const api = computed(() => select.connect(state.value, send, normalizeProps))

  watch(
    () => props.items,
    (value) => {
      // FIXME: blocked by zagjs setItems types
      api.value.collection.setItems(value)
    },
  )

  return api
}
