import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { useId, useMemo } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { CollectionItem, Optional } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useEvent } from '../../utils/use-event'

export interface UseSelectProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Optional<
      Omit<select.Context<T>, 'collection' | 'dir' | 'getRootNode' | 'open.controlled'>,
      'id'
    > {
  /**
   * The initial open state of the select when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: select.Context['open']
  /**
   * The initial value of the select when it is first rendered.
   * Use when you do not need to control the state of the select.
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const collection = useMemo(
    () => select.collection(collectionOptions),
    Object.values(collectionOptions),
  )

  const initialContext: select.Context<T> = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    collection,
    ...rest,
    value: props.defaultValue,
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
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
