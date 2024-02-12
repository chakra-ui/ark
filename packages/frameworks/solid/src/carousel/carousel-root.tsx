import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { CarouselProvider } from './carousel-context'
import { useCarousel, type UseCarouselProps, type UseCarouselReturn } from './use-carousel'

interface ElementProps extends UseCarouselProps {
  children?: JSX.Element | ((api: UseCarouselReturn) => JSX.Element)
}
export interface CarouselRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const CarouselRoot: ArkComponent<'div', ElementProps> = (props: CarouselRootProps) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
    'align',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'index',
    'loop',
    'onIndexChange',
    'orientation',
    'slidesPerView',
    'spacing',
  ])
  const api = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <CarouselProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </CarouselProvider>
  )
}
