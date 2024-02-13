import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { useId, useMemo } from 'react'
import { createSplitProps } from '../create-split-props'
import { useEnvironmentContext } from '../environment'
import { type CollectionItem, type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseSelectProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<select.Context<T>, 'id'>, 'collection' | 'open.controlled'> {
  /**
   * The initial value of the select.
   */
  defaultValue?: select.Context<T>['value']
}

export interface UseSelectReturn<T extends CollectionItem> extends select.Api<PropTypes, T> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
): UseSelectReturn<T> => {
  const [collectionOptions, rest] = createSplitProps<CollectionOptions<T>>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])

  const collection = useMemo(
    () => select.collection(collectionOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(collectionOptions),
  )

  const initialContext: select.Context<T> = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    collection,
    ...rest,
    value: props.defaultValue,
    'open.controlled': props.open,
  }

  const context: select.Context<T> = {
    ...initialContext,
    collection,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onHighlightChange: useEvent(props.onHighlightChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(select.machine(initialContext), {
    context,
  })

  return select.connect(state, send, normalizeProps)
}
