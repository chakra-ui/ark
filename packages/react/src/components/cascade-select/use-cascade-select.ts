import * as cascadeSelect from '@zag-js/cascade-select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import type { TreeCollection, TreeNode as CascadeSelectNode } from '../collection'
import { useFieldContext } from '../field'

export interface UseCascadeSelectProps<T extends CascadeSelectNode> extends Optional<
  Omit<cascadeSelect.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  collection: TreeCollection<T>
}

export interface UseCascadeSelectReturn<T extends CascadeSelectNode> extends cascadeSelect.Api<PropTypes, T> {}

export const useCascadeSelect = <T extends CascadeSelectNode>(
  props?: UseCascadeSelectProps<T>,
): UseCascadeSelectReturn<T> => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()
  const field = useFieldContext()

  const context: cascadeSelect.Props<T> = {
    id,
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(cascadeSelect.machine, context)
  return cascadeSelect.connect(service, normalizeProps)
}
