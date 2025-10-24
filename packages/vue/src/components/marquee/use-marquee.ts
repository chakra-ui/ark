import * as marquee from '@zag-js/marquee'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './marquee.types'

export interface UseMarqueeProps extends Optional<Omit<marquee.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMarqueeReturn extends ComputedRef<marquee.Api<PropTypes>> {}

export const useMarquee = (props: MaybeRef<UseMarqueeProps> = {}, emit?: EmitFn<RootEmits>): UseMarqueeReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<marquee.Props>(() => {
    const localeProps = toValue<UseMarqueeProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onPauseChange: (details) => {
        emit?.('pauseChange', details)
        localeProps.onPauseChange?.(details)
      },
      onLoopComplete: () => {
        emit?.('loopComplete')
        localeProps.onLoopComplete?.()
      },
      onComplete: () => {
        emit?.('complete')
        localeProps.onComplete?.()
      },
    }
  })

  const service = useMachine(marquee.machine, context)
  return computed(() => marquee.connect(service, normalizeProps))
}
