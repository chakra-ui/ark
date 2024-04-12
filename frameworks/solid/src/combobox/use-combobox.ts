import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import type { CollectionItem, Optional } from '../types'

export interface UseComboboxProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<combobox.Context<T>, 'id'>, 'collection'> {}

export interface UseComboboxReturn<T extends CollectionItem>
  extends Accessor<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
): UseComboboxReturn<T> => {
  const [collectionOptions, rest] = createSplitProps<CollectionOptions<T>>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])
  const collection = () => combobox.collection(collectionOptions)
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode, collection: collection() }, rest)

  const [state, send] = useMachine(combobox.machine(context), {
    context,
  })

  return createMemo(() => combobox.connect<PropTypes, T>(state, send, normalizeProps))
}
