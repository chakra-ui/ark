import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './avatar.types'

export interface UseAvatarProps
  extends Optional<Omit<avatar.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps, emit: EmitFn<RootEmits>): UseAvatarReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<avatar.Context>(() => ({
    id: useId().value,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onStatusChange: (details) => emit('statusChange', details),
    ...props,
  }))

  const [state, send] = useMachine(avatar.machine(context.value), { context })
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
