import { useEnvironmentContext, useLocaleContext } from '$lib/providers'
import type { Accessor, Optional } from '$lib/types'
import * as cascadeSelect from '@zag-js/cascade-select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, ensureProps, runIfFn } from '@zag-js/utils'
import type { TreeCollection, TreeNode as CascadeSelectNode } from '../collection'
import { useFieldContext } from '../field'

export interface UseCascadeSelectProps<T extends CascadeSelectNode> extends Optional<
  Omit<cascadeSelect.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  collection: TreeCollection<T>
}
export interface UseCascadeSelectReturn<T extends CascadeSelectNode> extends Accessor<
  cascadeSelect.Api<PropTypes, T>
> {}

export const useCascadeSelect = <T extends CascadeSelectNode>(
  props?: MaybeFunction<UseCascadeSelectProps<T>>,
): UseCascadeSelectReturn<T> => {
  const locale = useLocaleContext()
  const env = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = $derived.by<UseCascadeSelectProps<T>>(() => {
    const resolvedProps = runIfFn(props)
    ensureProps(resolvedProps, ['id'])
    return {
      ids: {
        label: field?.().ids?.label,
        hiddenInput: field?.().ids?.control,
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

  const service = useMachine(cascadeSelect.machine, () => machineProps)
  const api = $derived(cascadeSelect.connect<PropTypes, T>(service, normalizeProps))
  return () => api
}
