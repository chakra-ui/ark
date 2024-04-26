import * as slider from '@zag-js/slider'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSliderProps
  extends Optional<Omit<slider.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSliderReturn extends Accessor<slider.Api<PropTypes>> {}

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(slider.machine(context), { context })

  return createMemo(() => slider.connect(state, send, normalizeProps))
}
