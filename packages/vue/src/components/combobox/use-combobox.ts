import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { CollectionItem, EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
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
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<combobox.Context<T>>(() => {
    const { items, itemToString, itemToValue, isItemDisabled, ...otherProps } = props
    return {
      id,
      dir: locale.value.dir,
      collection: combobox.collection({ items, itemToString, itemToValue, isItemDisabled }),
      open: props.defaultOpen,
      'open.controlled': props.open !== undefined,
      value: props.modelValue ?? props.defaultValue,
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
      ...cleanProps(otherProps),
    }
  })
  const [state, send] = useMachine(combobox.machine(context.value), { context })

  return computed(() => combobox.connect(state.value, send, normalizeProps))
}
