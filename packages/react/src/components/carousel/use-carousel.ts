import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseCarouselProps
  extends Optional<Omit<carousel.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial index of the carousel when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultIndex?: carousel.Context['index']
}

export interface UseCarouselReturn extends carousel.Api<PropTypes> {}

export const useCarousel = (props: UseCarouselProps = {}): UseCarouselReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: carousel.Context = {
    id: useId(),
    dir,
    getRootNode,
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
