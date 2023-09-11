import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseCarouselProps extends Optional<carousel.Context, 'id'> {}
export type UseCarouselReturn = carousel.Api

export const useCarousel = (props: UseCarouselProps): UseCarouselReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(carousel.machine(context), { context })
  return carousel.connect(state, send, normalizeProps)
}
