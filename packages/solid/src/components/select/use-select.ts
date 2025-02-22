import * as select from '@zag-js/select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId, splitProps } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { CollectionItem, Optional } from '../../types'
import type { ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<Omit<select.Props<T>, 'collection' | 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends Accessor<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(props: UseSelectProps<T>): UseSelectReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const initialContext = createMemo(() => ({
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
    ...props,
  }))

  const machineProps = createMemo(() => {
    const [, restProps] = splitProps(initialContext(), ['collection'])
    return restProps
  })

  const service = useMachine(select.machine, machineProps)
  return createMemo(() => select.connect<PropTypes, T>(service, normalizeProps))
}
