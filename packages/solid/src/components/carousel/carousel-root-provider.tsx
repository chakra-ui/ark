import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseCarouselReturn } from './use-carousel.ts'
import { CarouselProvider } from './use-carousel-context.ts'

interface RootProviderProps {
  value: UseCarouselReturn
}

export interface CarouselRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselRootProviderProps extends HTMLProps<'div'>, RootProviderProps, CarouselRootProviderBaseProps {}

export const CarouselRootProvider = (props: CarouselRootProviderProps) => {
  const [{ value: carousel }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => carousel().getRootProps(), localProps)

  return (
    <CarouselProvider value={carousel}>
      <ark.div {...mergedProps} />
    </CarouselProvider>
  )
}
