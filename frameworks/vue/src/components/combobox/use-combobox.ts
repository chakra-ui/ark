import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { CollectionItem, EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './combobox'

export interface UseComboboxProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Optional<
      Omit<combobox.Context<T>, 'dir' | 'getRootNode' | 'collection' | 'open.controlled' | 'value'>,
      'id'
    > {
  modelValue?: combobox.Context<T>['value']
  /**
   * The initial open state of the combobox when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: combobox.Context['open']
  /**
   * The initial value of the combobox when it is first rendered.
   * Use when you do not need to control the state of the combobox.
   */
  defaultValue?: combobox.Context['value']
}

export interface UseComboboxReturn<T extends CollectionItem>
  extends ComputedRef<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
  emit: EmitFn<RootEmits>,
): UseComboboxReturn<T> => {
  const env = useEnvironmentContext()

  const context = computed(() => {
    const { defaultValue, items, itemToString, itemToValue, isItemDisabled, modelValue, ...rest } =
      props
    return {
      ...rest,
      collection: combobox.collection({ items, itemToString, itemToValue, isItemDisabled }),
      value: modelValue ?? defaultValue,
    }
  })

  const [state, send] = useMachine(
    combobox.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      getRootNode: env?.value.getRootNode,
      onFocusOutside: (details) => emit('focusOutside', details),
      onHighlightChange: (details) => emit('highlightChange', details),
      onInputValueChange: (details) => emit('inputValueChange', details),
      onInteractOutside: (details) => emit('interactOutside', details),
      onPointerDownOutside: (details) => emit('pointerDownOutside', details),
      onOpenChange: (details) => {
        emit('openChange', details)
        emit('update:open', details.open)
      },
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => combobox.connect(state.value, send, normalizeProps))
}
