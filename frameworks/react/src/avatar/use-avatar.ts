import * as avatar from '@zag-js/avatar'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseAvatarProps extends Optional<avatar.Context, 'id'> {}
export interface UseAvatarReturn extends avatar.Api<PropTypes> {}

export const useAvatar = (props: UseAvatarProps = {}): UseAvatarReturn => {
  const initialContext: avatar.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
  }

  const context: avatar.Context = {
    ...initialContext,
    onLoadingStatusChange: useEvent(props.onLoadingStatusChange),
  }

  const [state, send] = useMachine(avatar.machine(initialContext), { context })
  return avatar.connect(state, send, normalizeProps)
}
