import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as zagSwitch from '@zag-js/switch'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '~/providers'
import type { Optional } from '~/types'

export interface UseSwitchProps extends Optional<zagSwitch.Context, 'id'> {}
export interface UseSwitchReturn extends Accessor<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props: UseSwitchProps): UseSwitchReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(zagSwitch.machine(context), { context })

  return createMemo(() => zagSwitch.connect(state, send, normalizeProps))
}
