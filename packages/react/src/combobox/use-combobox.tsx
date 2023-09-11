import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type Assign, type Optional } from '../types'

export type CollectionItem = string | Record<string, unknown>
// export interface UseComboboxProps extends Optional<combobox.Context, 'id'> {}
// export type UseComboboxReturn = combobox.Api

export type UseComboboxProps<T extends CollectionItem> = Assign<
  Optional<Omit<combobox.Context<T>, 'collection'>, 'id'>,
  {
    defaultValue?: combobox.Context<T>['value']
  }
> &
  CollectionOptions<T>

export type UseComboboxReturn<T extends CollectionItem> = combobox.Api<PropTypes, T>

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
): UseComboboxReturn<T> => {
  const getRootNode = useEnvironmentContext()
  const [collectionOptions, rest] = createSplitProps<CollectionOptions<T>>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])
  const collection = combobox.collection(collectionOptions)

  const initialContext = {
    id: useId(),
    getRootNode,
    collection,
    ...rest,
    value: props.defaultValue,
  }
  const context = {
    ...initialContext,
    collection,
    value: props.value,
  }

  const [state, send] = useMachine(combobox.machine(initialContext), {
    context,
  })

  return combobox.connect(state, send, normalizeProps)
}
