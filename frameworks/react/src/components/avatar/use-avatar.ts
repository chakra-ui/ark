import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseAvatarProps
  extends Optional<Omit<avatar.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends avatar.Api<PropTypes> {}

export const useAvatar = (props: UseAvatarProps = {}): UseAvatarReturn => {
  const { dir } = useLocaleContext()
  const initialContext: avatar.Context = {
    id: useId(),
    dir,
    getRootNode: useEnvironmentContext(),
    ...props,
  }

  const context: avatar.Context = {
    ...initialContext,
    onStatusChange: useEvent(props.onStatusChange),
  }

  const [state, send] = useMachine(avatar.machine(initialContext), { context })
  return avatar.connect(state, send, normalizeProps)
}
