import * as select from '@zag-js/select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'
import type { RootEmits } from './select'

export interface UseSelectProps<T extends CollectionItem> extends Optional<
  Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  /**
   * The model value of the select
   */
  modelValue?: select.Props<T>['value']
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends ComputedRef<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(
  props: MaybeRef<UseSelectProps<T>>,
  emit?: EmitFn<RootEmits<T>>,
): UseSelectReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<select.Props<T>>(() => {
    const localProps = toValue<UseSelectProps<T>>(props)

    return {
      id,
      ids: {
        label: field?.value.ids.label,
        hiddenSelect: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      invalid: field?.value.invalid,
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
      onHighlightChange: (details) => {
        emit?.('highlightChange', details)
        emit?.('update:highlightedValue', details.highlightedValue)
        localProps.onHighlightChange?.(details)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localProps.onOpenChange?.(details)
      },
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        localProps.onFocusOutside?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        localProps.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        localProps.onPointerDownOutside?.(details)
      },
      onSelect(details) {
        emit?.('select', details)
        localProps.onSelect?.(details)
      },
    }
  })

  const service = useMachine(select.machine, context)
  return computed(() => select.connect(service, normalizeProps))
}
