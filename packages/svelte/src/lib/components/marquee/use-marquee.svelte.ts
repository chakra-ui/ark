import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as marquee from '@zag-js/marquee'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseMarqueeProps extends Omit<marquee.Props, 'dir' | 'getRootNode'> {}
export interface UseMarqueeReturn extends Accessor<marquee.Api<PropTypes>> {}

export const useMarquee = (props: MaybeFunction<UseMarqueeProps>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(marquee.machine, () => machineProps)
  const api = $derived(marquee.connect(service, normalizeProps))
  return () => api
}
