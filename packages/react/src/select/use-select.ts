import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type Assign, type Optional } from '../types'

export type CollectionItem = string | Record<string, unknown>

export type UseSelectProps<T extends CollectionItem> = Assign<
  Optional<Omit<select.Context<T>, 'collection'>, 'id'>,
  {
    defaultValue?: select.Context<T>['value']
  }
> &
  CollectionOptions<T>

export type UseSelectReturn<T extends CollectionItem> = select.Api<PropTypes, T>

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
): UseSelectReturn<T> => {
  const getRootNode = useEnvironmentContext()
  const [collectionOptions, rest] = createSplitProps<CollectionOptions<T>>()(props, [
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
