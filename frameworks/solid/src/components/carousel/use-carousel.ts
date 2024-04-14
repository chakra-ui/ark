import * as carousel from '@zag-js/carousel'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseCarouselProps extends Optional<carousel.Context, 'id'> {}
export interface UseCarouselReturn extends Accessor<carousel.Api<PropTypes>> {}

export const useCarousel = (props: UseCarouselProps): UseCarouselReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(carousel.machine(context), { context })
  return createMemo(() => carousel.connect(state, send, normalizeProps))
}
