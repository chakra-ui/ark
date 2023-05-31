import * as avatar from '@zag-js/avatar'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseAvatarProps = Optional<avatar.Context, 'id'>

export type UseAvatarReturn = ReturnType<typeof useAvatar>

export const useAvatar = (props: UseAvatarProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(avatar.machine(context), { context })
  return avatar.connect(state, send, normalizeProps)
}
