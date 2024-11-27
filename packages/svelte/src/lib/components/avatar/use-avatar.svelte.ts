import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseAvatarProps
  extends Optional<Omit<avatar.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends Accessor<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps = {}) => {
  const context = $derived({
    id: createId(),
    ...props,
  })

  const [state, send] = useMachine(avatar.machine(context), { context })
  const api = $derived(() => avatar.connect(state, send, normalizeProps))
  return api
}
