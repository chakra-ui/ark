import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './combobox.props'

export interface UseComboboxProps
  extends CollectionOptions,
    Omit<Optional<combobox.Context, 'id'>, 'collection'> {
  modelValue?: combobox.Context['value']
}
export type UseComboboxReturn = ComputedRef<combobox.Api<PropTypes>>

export const useCombobox = (props: UseComboboxProps, emit: CallableFunction): UseComboboxReturn => {
  const { items, itemToString, itemToValue, isItemDisabled, ...comboboxProps } = props
  const context = computed(() => {
    const { modelValue, ...rest } = comboboxProps
    return {
      ...rest,
      value: modelValue,
    }
  })
  const collection = combobox.collection({ items, itemToString, itemToValue, isItemDisabled })
  const getRootNode = useEnvironmentContext()
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    combobox.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
      collection,
      onChange: (details) => {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )
  return computed(() => combobox.connect(state.value, send, normalizeProps))
}
