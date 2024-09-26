import * as select from '@zag-js/select'
import { omit } from '@zag-js/utils'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, watch } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'
import type { RootEmits } from './select'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<
    Omit<select.Context<T>, 'dir' | 'getRootNode' | 'open.controlled' | 'collection'>,
    'id'
  > {
  modelValue?: select.Context<T>['value']
  /**
   * The initial open state of the select when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: select.Context<T>['open']
  /**
   * The initial value of the select when it is first rendered.
   * Use when you do not need to control the state of the select.
   */
  defaultValue?: select.Context<T>['value']
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem>
  extends ComputedRef<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
  emit?: EmitFn<RootEmits<T>>,
): UseSelectReturn<T> => {
  const id = useId() as string
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const initialContext = computed<select.Context<T>>(() => ({
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
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    onHighlightChange: (details) => emit?.('highlightChange', details),
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open)
    },
    onFocusOutside: (details) => emit?.('focusOutside', details),
    onInteractOutside: (details) => emit?.('interactOutside', details),
    onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
    ...cleanProps(props),
  }))

  const [state, send, service] = useMachine(select.machine(initialContext.value), {
    context: computed(() => omit(initialContext.value, ['collection'])),
  })

  watch(
    () => props.collection,
    (collection) => {
      service.setContext({ collection })
    },
  )

  return computed(() => select.connect(state.value, send, normalizeProps))
}
