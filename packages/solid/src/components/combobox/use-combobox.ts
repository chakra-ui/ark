import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseComboboxProps<T extends CollectionItem>
  extends Optional<Omit<combobox.Props<T>, 'collection' | 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseComboboxReturn<T extends CollectionItem> extends Accessor<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: MaybeAccessor<UseComboboxProps<T>>,
): UseComboboxReturn<T> => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const field = useFieldContext()

  const machineProps = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      input: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    invalid: field?.().invalid,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(combobox.machine, machineProps)
  return createMemo(() => combobox.connect<PropTypes, T>(service, normalizeProps))
}
