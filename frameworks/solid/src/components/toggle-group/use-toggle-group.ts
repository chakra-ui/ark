import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as toggleGroup from '@zag-js/toggle-group'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseToggleGroupProps
  extends Optional<Omit<toggleGroup.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseToggleGroupReturn extends Accessor<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (props: UseToggleGroupProps): UseToggleGroupReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(toggleGroup.machine(context), {
    context,
  })

  return createMemo(() => toggleGroup.connect(state, send, normalizeProps))
}
