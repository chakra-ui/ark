import * as angleSlider from '@zag-js/angle-slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseAngleSliderProps extends Optional<Omit<angleSlider.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAngleSliderReturn extends angleSlider.Api<PropTypes> {}

export const useAngleSlider = (props?: UseAngleSliderProps): UseAngleSliderReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: angleSlider.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(angleSlider.machine, machineProps)
  return angleSlider.connect(service, normalizeProps)
}
