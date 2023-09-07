import { normalizeProps, useMachine } from '@zag-js/react'
import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type Assign, type Optional } from '../types'

export type UseSelectProps = Assign<
  Optional<Omit<select.Context, 'collection'>, 'id'>,
  {
    defaultValue?: select.Context['value']
  }
> &
  CollectionOptions

export type UseSelectReturn = select.Api

export const useSelect = (props: UseSelectProps): UseSelectReturn => {
  const getRootNode = useEnvironmentContext()
  const [collectionOptions, rest] = createSplitProps<CollectionOptions>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])
  const collection = select.collection(collectionOptions)

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

  const [state, send] = useMachine(select.machine(initialContext), {
    context,
  })

  return select.connect(state, send, normalizeProps)
}
