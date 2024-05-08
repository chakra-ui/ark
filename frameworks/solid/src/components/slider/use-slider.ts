import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSliderProps
  extends Optional<Omit<slider.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSliderReturn extends Accessor<slider.Api<PropTypes>> {}

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(slider.machine(context()), { context })

  return createMemo(() => slider.connect(state, send, normalizeProps))
}
