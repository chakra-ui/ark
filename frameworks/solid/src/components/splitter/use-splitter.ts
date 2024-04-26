import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as splitter from '@zag-js/splitter'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSplitterProps
  extends Optional<Omit<splitter.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSplitterReturn extends Accessor<splitter.Api<PropTypes>> {}

export const useSplitter = (props: UseSplitterProps): UseSplitterReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(splitter.machine(context), { context })

  return createMemo(() => splitter.connect(state, send, normalizeProps))
}
