import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as select from '@zag-js/select'
import { useEffect, useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<
    Omit<select.Context<T>, 'dir' | 'getRootNode' | 'open.controlled' | 'collection'>,
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
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends select.Api<PropTypes, T> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
): UseSelectReturn<T> => {
  const { collection, ...selectProps } = props
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const initialContext: select.Context<T> = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      hiddenSelect: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir: locale.dir,
    getRootNode: environment.getRootNode,
    collection,
    open: props.defaultOpen,
    value: props.defaultValue,
    'open.controlled': props.open !== undefined,
    ...selectProps,
  }

  const context = (() => {
    const { collection: _, ...restProps } = initialContext
    return {
      ...restProps,
      value: props.value,
      onValueChange: useEvent(props.onValueChange, { sync: true }),
      onHighlightChange: useEvent(props.onHighlightChange),
      onOpenChange: useEvent(props.onOpenChange),
    }
  })()

  const [state, send, service] = useMachine(select.machine(initialContext), {
    context,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    service.setContext({ collection })
  }, [collection])

  return select.connect(state, send, normalizeProps)
}
