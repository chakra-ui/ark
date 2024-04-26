import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { CollectionItem, Optional } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'

export interface UseComboboxProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Optional<
      Omit<combobox.Context<T>, 'collection' | 'dir' | 'getRootNode' | 'open.controlled'>,
      'id'
    > {}

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
  const context = mergeProps(
    {
      id: createUniqueId(),
      getRootNode,
      'open.controlled': props.open !== undefined,
      collection: collection(),
    },
    rest,
  )

  const [state, send] = useMachine(combobox.machine(context), {
    context,
  })

  return createMemo(() => combobox.connect<PropTypes, T>(state, send, normalizeProps))
}
