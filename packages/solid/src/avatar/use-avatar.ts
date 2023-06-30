import * as avatar from '@zag-js/avatar'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseAvatarProps = Optional<avatar.Context, 'id'>
export type UseAvatarReturn = ReturnType<typeof useAvatar>

export const useAvatar = (props: UseAvatarProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(avatar.machine(context), { context })

  return createMemo(() => avatar.connect(state, send, normalizeProps))
}
