import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseCarouselReturn } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

export interface CarouselRootProviderBaseProps {
  value: UseCarouselReturn
}
export interface CarouselRootProviderProps
  extends HTMLArkProps<'div'>,
    CarouselRootProviderBaseProps {}

export const CarouselRootProvider = forwardRef<HTMLDivElement, CarouselRootProviderProps>(
  (props, ref) => {
    const [{ value: carousel }, localProps] = createSplitProps<CarouselRootProviderBaseProps>()(
      props,
      ['value'],
    )
    const mergedProps = mergeProps(carousel.getRootProps(), localProps)

    return (
      <CarouselProvider value={carousel}>
        <ark.div {...mergedProps} ref={ref} />
      </CarouselProvider>
    )
  },
)

CarouselRootProvider.displayName = 'CarouselRootProvider'
