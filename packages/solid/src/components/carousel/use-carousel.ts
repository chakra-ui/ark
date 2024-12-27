import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseCarouselProps
  extends Optional<Omit<carousel.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial index of the carousel when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultPage?: carousel.Context['page']
}
export interface UseCarouselReturn extends Accessor<carousel.Api<PropTypes>> {}

export const useCarousel = (props: UseCarouselProps = {}): UseCarouselReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    index: props.defaultPage,
    ...props,
  }))

  const [state, send] = useMachine(carousel.machine(context()), { context })
  return createMemo(() => carousel.connect(state, send, normalizeProps))
}
