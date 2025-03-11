import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSliderProps extends Optional<Omit<slider.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSliderReturn extends slider.Api<PropTypes> {}

export const useSlider = (props?: UseSliderProps): UseSliderReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: slider.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(slider.machine, machineProps)
  return slider.connect(service, normalizeProps)
}
