import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseCarouselProps extends Optional<Omit<carousel.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseCarouselReturn extends Accessor<carousel.Api<PropTypes>> {}

export const useCarousel = (props?: MaybeFunction<UseCarouselProps>): UseCarouselReturn => {
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

  const service = useMachine(carousel.machine, () => machineProps)
  const api = $derived(carousel.connect(service, normalizeProps))

  return () => api
}
