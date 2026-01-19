import type { Accessor, Optional } from '$lib/types.js'
import * as listbox from '@zag-js/listbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import type { CollectionItem, ListCollection } from '../collection/index.js'

export interface UseListboxProps<T extends CollectionItem> extends Optional<
  Omit<listbox.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseListboxReturn<T extends CollectionItem> extends Accessor<listbox.Api<PropTypes, T>> {}

export const useListbox = <T extends CollectionItem>(props: MaybeFunction<UseListboxProps<T>>): UseListboxReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(listbox.machine, () => machineProps)
  const api = $derived(listbox.connect(service, normalizeProps))

  return () => api
}
