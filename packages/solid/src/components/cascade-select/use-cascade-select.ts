import * as cascadeSelect from '@zag-js/cascade-select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor } from '../../types'
import type { TreeCollection, TreeNode as CascadeSelectNode } from '../collection'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UseCascadeSelectProps<T extends CascadeSelectNode> extends Omit<
  cascadeSelect.Props<T>,
  'dir' | 'getRootNode' | 'id' | 'collection'
> {
  id?: string
  collection: TreeCollection<T>
}
export interface UseCascadeSelectReturn<T extends CascadeSelectNode> extends Accessor<
  cascadeSelect.Api<PropTypes, T>
> {}

export const useCascadeSelect = <T extends CascadeSelectNode>(
  props?: MaybeAccessor<UseCascadeSelectProps<T>>,
): UseCascadeSelectReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<cascadeSelect.Props<T>>(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    invalid: field?.().invalid,
    required: field?.().required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(cascadeSelect.machine, machineProps)
  return createMemo(() => cascadeSelect.connect<PropTypes, T>(service, normalizeProps))
}
