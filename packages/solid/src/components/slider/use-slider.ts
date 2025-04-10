import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseSliderProps extends Optional<Omit<slider.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSliderReturn extends Accessor<slider.Api<PropTypes>> {}

export const useSlider = (props?: MaybeAccessor<UseSliderProps>): UseSliderReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<slider.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(slider.machine, machineProps)
  return createMemo(() => slider.connect(service, normalizeProps))
}
