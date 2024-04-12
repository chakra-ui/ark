import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as splitter from '@zag-js/splitter'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseSplitterProps extends Optional<splitter.Context, 'id'> {}
export interface UseSplitterReturn extends Accessor<splitter.Api<PropTypes>> {}

export const useSplitter = (props: UseSplitterProps): UseSplitterReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(splitter.machine(context), { context })

  return createMemo(() => splitter.connect(state, send, normalizeProps))
}
