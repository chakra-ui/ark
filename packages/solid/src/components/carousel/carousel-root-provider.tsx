import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseCarouselReturn } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

interface RootProviderProps {
  value: UseCarouselReturn
}

export interface CarouselRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const CarouselRootProvider = (props: CarouselRootProviderProps) => {
  const [{ value: carousel }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => carousel().rootProps, localProps)

  return (
    <CarouselProvider value={carousel}>
      <ark.div {...mergedProps} />
    </CarouselProvider>
  )
}
