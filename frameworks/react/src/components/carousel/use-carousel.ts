import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '~/providers/environment'
import type { Optional } from '~/types'
import { useEvent } from '~/utils/use-event'

export interface UseCarouselProps extends Optional<carousel.Context, 'id'> {
  /**
   * The initial selected index of the carousel.
   */
  defaultIndex?: carousel.Context['index']
}

export interface UseCarouselReturn extends carousel.Api<PropTypes> {}

export const useCarousel = (props: UseCarouselProps = {}): UseCarouselReturn => {
  const initialContext: carousel.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    index: props.defaultIndex,
    ...props,
  }

  const context: carousel.Context = {
    ...initialContext,
    index: props.index,
    onIndexChange: useEvent(props.onIndexChange, { sync: true }),
  }

  const [state, send] = useMachine(carousel.machine(initialContext), { context })
  return carousel.connect(state, send, normalizeProps)
}
