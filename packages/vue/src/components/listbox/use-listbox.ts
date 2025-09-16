import * as listbox from '@zag-js/listbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { CollectionItem, ListCollection } from '../collection'
import type { RootEmits } from './listbox'

export interface UseListboxProps<T extends CollectionItem>
  extends Optional<Omit<listbox.Props<T>, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
  /**
   * The model value of the listbox
   */
  modelValue?: listbox.Props<T>['value']
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseListboxReturn<T extends CollectionItem> extends ComputedRef<listbox.Api<PropTypes, T>> {}

export const useListbox = <T extends CollectionItem>(
  props: MaybeRef<UseListboxProps<T>>,
  emit?: EmitFn<RootEmits<T>>,
): UseListboxReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<listbox.Props<T>>(() => {
    const localProps = toValue<UseListboxProps<T>>(props)

    return {
      id,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onHighlightChange: (details) => {
        emit?.('highlightChange', details)
        localProps.onHighlightChange?.(details)
      },
      onSelect: (details) => {
        emit?.('select', details)
        localProps.onSelect?.(details)
      },
    }
  })

  const service = useMachine(listbox.machine, context)
  return computed(() => listbox.connect(service, normalizeProps))
}
