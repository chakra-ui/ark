import * as avatar from '@zag-js/avatar'
import { normalizeProps, useMachine } from '@zag-js/svelte'
import type { Optional } from '../../../types'
import { createId } from '../../utils/create-id'

export interface UseAvatarProps
  extends Optional<Omit<avatar.Context, 'dir' | 'getRootNode'>, 'id'> {}
export type UseAvatarReturn = ReturnType<typeof useAvatar>

export const useAvatar = (props: UseAvatarProps) => {
  const id = createId()
  const context = $derived({
    id,
    ...props,
  })

  const [state, send] = useMachine(avatar.machine(context), { context })
  const api = $derived(() => avatar.connect(state, send, normalizeProps))
  return api
}
