import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseCarouselProps = Optional<carousel.Context, 'id'>

export type UseCarouselReturn = ReturnType<typeof useCarousel>

export const useCarousel = (props: UseCarouselProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(carousel.machine(context), { context })
  return carousel.connect(state, send, normalizeProps)
}
