import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as angleSlider from '@zag-js/angle-slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseAngleSliderProps extends Omit<angleSlider.Props, 'dir' | 'getRootNode'> {}
export interface UseAngleSliderReturn extends Accessor<angleSlider.Api<PropTypes>> {}

export const useAngleSlider = (props: MaybeFunction<UseAngleSliderProps>) => {
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

  const service = useMachine(angleSlider.machine, () => machineProps)
  const api = $derived(angleSlider.connect(service, normalizeProps))
  return () => api
}
