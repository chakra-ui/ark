import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId, useMemo } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type CollectionItem, type Optional } from '../types'

export interface UseComboboxProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<combobox.Context<T>, 'id'>, 'collection'> {
  defaultValue?: combobox.Context<T>['value']
}

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

  const collection = useMemo(
    () => combobox.collection(collectionOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(collectionOptions),
  )

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
