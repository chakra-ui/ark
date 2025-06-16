import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseSliderProps extends Omit<slider.Props, 'dir' | 'getRootNode'> {}
export interface UseSliderReturn extends Accessor<slider.Api<PropTypes>> {}

export const useSlider = (props: MaybeFunction<UseSliderProps>) => {
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

  const service = useMachine(slider.machine, () => machineProps)
  const api = $derived(slider.connect(service, normalizeProps))
  return () => api
}
