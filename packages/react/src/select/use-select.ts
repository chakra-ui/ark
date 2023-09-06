import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type Assign, type Optional } from '../types'

type CollectionOptions<T> = {
  items: T[]
  itemToValue?: ((item: T) => string) | undefined
  itemToString?: ((item: T) => string) | undefined
  isItemDisabled?: ((item: T) => boolean) | undefined
}

type ValueChangeDetails<T> = {
  value: string[]
  items: T[]
}

export type UseSelectProps<T> = Assign<
  Optional<Omit<select.Context<T>, 'collection'>, 'id'>,
  {
    defaultValue?: select.Context<T>['value']
    onChange?: (details: ValueChangeDetails<T>) => void
  }
> &
  CollectionOptions<T>

// @ts-expect-error asdf
export type UseSelectReturn<T> = select.Api<PropTypes, T>

export const useSelect = <T>(props: UseSelectProps<T>): UseSelectReturn<T> => {
  const getRootNode = useEnvironmentContext()
  const [collectionOptions, rest] = createSplitProps<CollectionOptions<T>>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])
  // @ts-expect-error fix later
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
  // @ts-expect-error fix later
  return select.connect(state, send, normalizeProps)
}
