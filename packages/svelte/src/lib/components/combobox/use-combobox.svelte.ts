import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import type { CollectionItem, ListCollection } from '../collection'
import { useFieldContext } from '../field'

export interface UseComboboxProps<T extends CollectionItem> extends Optional<
  Omit<combobox.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  /**
   * The collection of items
   */
  collection: MaybeFunction<ListCollection<T>>
}

export interface UseComboboxReturn<T extends CollectionItem> extends Accessor<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: MaybeFunction<UseComboboxProps<T>>,
): UseComboboxReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    const collection = runIfFn(resolvedProps.collection)
    return {
      ids: {
        label: field?.()?.ids.label,
        input: field?.()?.ids.control,
      },
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      required: field?.()?.required,
      invalid: field?.()?.invalid,
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
      collection,
    }
  })

  const service = useMachine(combobox.machine, () => machineProps)
  const api = $derived(combobox.connect(service, normalizeProps))

  return () => api
}
