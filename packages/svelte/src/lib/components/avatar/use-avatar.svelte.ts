import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseAvatarProps extends Optional<Omit<avatar.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends Accessor<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps = {}) => {
  const id = createId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived({
    id,
    dir: locale.dir,
    getRootNode: env.getRootNode,
    ...props,
  })
  const service = useMachine(avatar.machine, () => machineProps)
  const api = $derived(() => avatar.connect(service, normalizeProps))
  return api
}
