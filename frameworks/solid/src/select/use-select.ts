import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type CollectionItem, type Optional } from '../types'

export interface UseSelectProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<select.Context<T>, 'id'>, 'collection' | 'open.controlled'> {}

export interface UseSelectReturn<T extends CollectionItem>
  extends Accessor<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
): UseSelectReturn<T> => {
  const [collectionOptions, rest] = createSplitProps<CollectionOptions<T>>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])
  const collection = () => select.collection(collectionOptions)
  const getRootNode = useEnvironmentContext()
  const context = mergeProps(
    {
      id: createUniqueId(),
      getRootNode,
      collection: collection(),
    },
    rest,
  )
  const [state, send] = useMachine(select.machine(context), {
    context,
  })

  return createMemo(() => select.connect<PropTypes, T>(state, send, normalizeProps))
}
