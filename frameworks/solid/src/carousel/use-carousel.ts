import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { mergeProps } from '../merge-props'
import { type Optional } from '../types'

export interface UseCarouselProps extends Optional<carousel.Context, 'id'> {}
export interface UseCarouselReturn extends Accessor<carousel.Api<PropTypes>> {}

export const useCarousel = (props: UseCarouselProps): UseCarouselReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(carousel.machine(context), { context })
  return createMemo(() => carousel.connect(state, send, normalizeProps))
}
