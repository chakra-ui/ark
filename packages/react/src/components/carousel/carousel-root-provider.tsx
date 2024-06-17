import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseCarouselReturn } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

interface RootProviderProps {
  value: UseCarouselReturn
}

export interface CarouselRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CarouselRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    CarouselRootProviderBaseProps {}

export const CarouselRootProvider = forwardRef<HTMLDivElement, CarouselRootProviderProps>(
  (props, ref) => {
    const [{ value: carousel }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(carousel.getRootProps(), localProps)

    return (
      <CarouselProvider value={carousel}>
        <ark.div {...mergedProps} ref={ref} />
      </CarouselProvider>
    )
  },
)

CarouselRootProvider.displayName = 'CarouselRootProvider'
