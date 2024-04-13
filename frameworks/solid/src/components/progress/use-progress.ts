import * as progress from '@zag-js/progress'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '~/providers'
import type { Optional } from '~/types'

export interface UseProgressProps extends Optional<progress.Context, 'id'> {}
export interface UseProgressReturn extends Accessor<progress.Api<PropTypes>> {}

export const useProgress = (props: UseProgressProps): UseProgressReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(progress.machine(context), { context })

  return createMemo(() => progress.connect(state, send, normalizeProps))
}
