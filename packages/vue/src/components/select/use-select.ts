import * as select from '@zag-js/select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'
import type { RootEmits } from './select'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
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
  props: UseSelectProps<T>,
  emit?: EmitFn<RootEmits<T>>,
): UseSelectReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<select.Props<T>>(() => ({
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
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
      props.onValueChange?.(details)
    },
    onHighlightChange: (details) => {
      emit?.('highlightChange', details)
      emit?.('update:highlightedValue', details.highlightedValue)
      props.onHighlightChange?.(details)
    },
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open)
      props.onOpenChange?.(details)
    },
    onFocusOutside: (details) => {
      emit?.('focusOutside', details)
      props.onFocusOutside?.(details)
    },
    onInteractOutside: (details) => {
      emit?.('interactOutside', details)
      props.onInteractOutside?.(details)
    },
    onPointerDownOutside: (details) => {
      emit?.('pointerDownOutside', details)
      props.onPointerDownOutside?.(details)
    },
  }))

  const service = useMachine(select.machine, context)
  return computed(() => select.connect(service, normalizeProps))
}
