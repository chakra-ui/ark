import type { CollectionOptions } from '@zag-js/combobox'
import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId, useMemo } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { CollectionItem, Optional } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useEvent } from '../../utils/use-event'

export interface UseComboboxProps<T extends CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<combobox.Context<T>, 'id'>, 'collection' | 'open.controlled'> {
  /**
   * the initial value of the combobox
   */
  defaultValue?: combobox.Context<T>['value']
}

export interface UseComboboxReturn<T extends CollectionItem> extends combobox.Api<PropTypes, T> {}

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
): UseComboboxReturn<T> => {
  const [collectionOptions, comboboxProps] = createSplitProps<CollectionOptions<T>>()(props, [
    'isItemDisabled',
    'itemToValue',
    'itemToString',
    'items',
  ])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const collection = useMemo(
    () => combobox.collection(collectionOptions),
    Object.values(collectionOptions),
  )

  const initialContext: combobox.Context<T> = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    collection,
    ...comboboxProps,
    value: props.defaultValue,
    'open.controlled': props.open !== undefined,
  }

  const context: combobox.Context<T> = {
    ...initialContext,
    collection,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onInputValueChange: useEvent(props.onInputValueChange, { sync: true }),
    onHighlightChange: useEvent(props.onHighlightChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(combobox.machine(initialContext), {
    context,
  })

  return combobox.connect(state, send, normalizeProps)
}
