import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type Assign, type Optional } from '../types'

export type UseComboboxProps = Assign<
  Optional<Omit<combobox.Context, 'collection'>, 'id'>,
  {
    defaultValue?: combobox.Context['value']
  }
> &
  CollectionOptions

export type UseComboboxReturn = combobox.Api

export const useCombobox = (props: UseComboboxProps): UseComboboxReturn => {
  const getRootNode = useEnvironmentContext()
  const [collectionOptions, rest] = createSplitProps<CollectionOptions>()(props, [
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
