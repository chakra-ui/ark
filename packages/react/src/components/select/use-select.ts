import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseSelectProps<T extends CollectionItem>
  extends Optional<Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends select.Api<PropTypes, T> {}

export const useSelect = <T extends CollectionItem>(props: UseSelectProps<T>): UseSelectReturn<T> => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()
  const field = useFieldContext()

  const userProps: select.Props<T> = {
    id,
    ids: {
      label: field?.ids.label,
      hiddenSelect: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(select.machine, userProps)
  return select.connect(service, normalizeProps)
}
