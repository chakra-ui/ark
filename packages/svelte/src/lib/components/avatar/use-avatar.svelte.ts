import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseAvatarProps extends Omit<avatar.Props, 'dir' | 'getRootNode'> {}
export interface UseAvatarReturn extends Accessor<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived({
    dir: locale.dir,
    getRootNode: env.getRootNode,
    ...props,
  })
  const service = useMachine(avatar.machine, () => machineProps)
  const api = $derived(() => avatar.connect(service, normalizeProps))
  return api
}
