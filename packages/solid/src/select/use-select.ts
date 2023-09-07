import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSelectProps = Optional<Omit<select.Context, 'collection'>, 'id'> & CollectionOptions
export type UseSelectReturn = Accessor<select.Api<PropTypes>>

export const useSelect = (props: UseSelectProps): UseSelectReturn => {
  const [collectionOptions, rest] = createSplitProps<CollectionOptions>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])
  const collection = select.collection(collectionOptions)
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode, collection }, rest)

  const [state, send] = useMachine(select.machine(context), {
    context,
  })

  return createMemo(() => select.connect(state, send, normalizeProps))
}
