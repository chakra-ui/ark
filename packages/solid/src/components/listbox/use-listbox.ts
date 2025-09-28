import * as listbox from '@zag-js/listbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import type { CollectionItem, ListCollection } from '../collection'

export interface UseListboxProps<T extends CollectionItem>
  extends Optional<Omit<listbox.Props<T>, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseListboxReturn<T extends CollectionItem> extends Accessor<listbox.Api<PropTypes, T>> {}

export const useListbox = <T extends CollectionItem>(props: MaybeAccessor<UseListboxProps<T>>): UseListboxReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(listbox.machine, machineProps)
  return createMemo(() => listbox.connect<PropTypes, T>(service, normalizeProps))
}
