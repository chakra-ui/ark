import * as avatar from '@zag-js/avatar'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseAvatarProps = Optional<avatar.Context, 'id'>
export type UseAvatarReturn = Accessor<avatar.Api<PropTypes>>

export const useAvatar = (props: UseAvatarProps): UseAvatarReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(avatar.machine(context), { context })

  return createMemo(() => avatar.connect(state, send, normalizeProps))
}
