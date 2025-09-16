import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './avatar.types'

export interface UseAvatarProps extends Optional<Omit<avatar.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: MaybeRef<UseAvatarProps> = {}, emit?: EmitFn<RootEmits>): UseAvatarReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<avatar.Props>(() => {
    const localeProps = toValue<UseAvatarProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onStatusChange: (details) => {
        emit?.('statusChange', details)
        localeProps.onStatusChange?.(details)
      },
    }
  })

  const service = useMachine(avatar.machine, context)
  return computed(() => avatar.connect(service, normalizeProps))
}
