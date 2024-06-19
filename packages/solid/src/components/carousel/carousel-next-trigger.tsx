import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CarouselNextTriggerProps
  extends HTMLProps<'button'>,
    CarouselNextTriggerBaseProps {}

export const CarouselNextTrigger = (props: CarouselNextTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
