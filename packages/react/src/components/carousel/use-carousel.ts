import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseCarouselProps
  extends Optional<Omit<carousel.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial page of the carousel when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultPage?: carousel.Context['page']
}

export interface UseCarouselReturn extends carousel.Api<PropTypes> {}

export const useCarousel = (props: UseCarouselProps = {}): UseCarouselReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: carousel.Context = {
    id: useId(),
    dir,
    getRootNode,
    page: props.defaultPage,
    ...props,
  }

  const context: carousel.Context = {
    ...initialContext,
    page: props.page,
    onPageChange: useEvent(props.onPageChange, { sync: true }),
  }

  const [state, send] = useMachine(carousel.machine(initialContext), { context })
  return carousel.connect(state, send, normalizeProps)
}
