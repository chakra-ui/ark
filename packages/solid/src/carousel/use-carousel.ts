import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseCarouselProps = Optional<carousel.Context, 'id'>

export const useCarousel = (props: UseCarouselProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(carousel.machine(context), { context })
  return createMemo(() => carousel.connect(state, send, normalizeProps))
}

export type UseCarouselReturn = ReturnType<typeof useCarousel>
