import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import type { Optional } from '../../../typts'

export interface UseAvatarProps
  extends Optional<Omit<avatar.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends avatar.Api<PropTypes> {}

export const useAvatar = (props: UseAvatarProps) => {
  const [snapshot, send] = useMachine(avatar.machine({ id: '1' }))
  const _api = avatar.connect(snapshot, send, normalizeProps)
  const api = $derived(_api)

  return new Proxy(api, {
    get(_, key: keyof typeof api) {
      return api[key]
    },
  })
}
