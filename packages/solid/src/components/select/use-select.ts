import * as select from '@zag-js/select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<Omit<select.Props<T>, 'collection' | 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends Accessor<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(props: MaybeAccessor<UseSelectProps<T>>): UseSelectReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenSelect: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    invalid: field?.().invalid,
    required: field?.().required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(select.machine, machineProps)
  return createMemo(() => select.connect<PropTypes, T>(service, normalizeProps))
}
