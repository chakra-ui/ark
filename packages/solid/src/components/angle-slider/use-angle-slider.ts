import * as angleSlider from '@zag-js/angle-slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseAngleSliderProps extends Optional<Omit<angleSlider.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAngleSliderReturn extends Accessor<angleSlider.Api<PropTypes>> {}

export const useAngleSlider = (props?: MaybeAccessor<UseAngleSliderProps>): UseAngleSliderReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<angleSlider.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(angleSlider.machine, machineProps)
  return createMemo(() => angleSlider.connect(service, normalizeProps))
}
