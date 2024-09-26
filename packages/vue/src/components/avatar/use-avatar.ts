import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './avatar.types'

export interface UseAvatarProps
  extends Optional<Omit<avatar.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps, emit?: EmitFn<RootEmits>): UseAvatarReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<avatar.Context>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onStatusChange: (details) => emit?.('statusChange', details),
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(avatar.machine(context.value), { context })
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
