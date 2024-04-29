import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseCarouselProps
  extends Optional<Omit<carousel.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial selected index of the carousel.
   */
  defaultIndex?: carousel.Context['index']
}

export interface UseCarouselReturn extends carousel.Api<PropTypes> {}

export const useCarousel = (props: UseCarouselProps = {}): UseCarouselReturn => {
  const { dir } = useLocaleContext()
  const initialContext: carousel.Context = {
    id: useId(),
    dir,
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
