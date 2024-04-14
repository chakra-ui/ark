import * as avatar from '@zag-js/avatar'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseAvatarProps extends Optional<avatar.Context, 'id'> {}
export interface UseAvatarReturn extends Accessor<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps): UseAvatarReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(avatar.machine(context), { context })

  return createMemo(() => avatar.connect(state, send, normalizeProps))
}
