import { useEnvironmentContext, useLocaleContext } from '$lib/providers'
import type { Accessor, Optional } from '$lib/types'
import * as select from '@zag-js/select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends Accessor<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(props: MaybeFunction<UseSelectProps<T>>): UseSelectReturn<T> => {
  const locale = useLocaleContext()
  const env = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = $derived.by<UseSelectProps<T>>(() => {
    const resolvedProps = runIfFn(props)
    return {
      ids: {
        label: field?.().ids?.label,
        hiddenSelect: field?.().ids?.control,
      },
      disabled: field?.().disabled,
      readOnly: field?.().readOnly,
      invalid: field?.().invalid,
      required: field?.().required,
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(select.machine, () => machineProps)

  const api = $derived(select.connect(service, normalizeProps))
  return () => api
}
