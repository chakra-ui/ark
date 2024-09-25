import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createUniqueId, splitProps } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { CollectionItem, Optional } from '../../types'
import type { ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseComboboxProps<T extends CollectionItem>
  extends Optional<
    Omit<combobox.Context<T>, 'collection' | 'dir' | 'getRootNode' | 'open.controlled'>,
    'id'
  > {
  /**
   * The initial open state of the combobox when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: combobox.Context['open']
  /**
   * The initial value of the combobox when it is first rendered.
   * Use when you do not need to control the state of the combobox.
   */
  defaultValue?: combobox.Context<T>['value']
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseComboboxReturn<T extends CollectionItem>
  extends Accessor<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
): UseComboboxReturn<T> => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const field = useFieldContext()

  const initialContext = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      input: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    invalid: field?.().invalid,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    value: props.defaultValue,
    'open.controlled': props.open !== undefined,
    ...props,
  }))

  const context = createMemo(() => {
    const [, restProps] = splitProps(initialContext(), ['collection'])
    return restProps
  })

  const [state, send, service] = useMachine(combobox.machine(initialContext()), {
    context,
  })

  createEffect(() => {
    service.setContext({ collection: props.collection })
  })

  return createMemo(() => combobox.connect<PropTypes, T>(state, send, normalizeProps))
}
