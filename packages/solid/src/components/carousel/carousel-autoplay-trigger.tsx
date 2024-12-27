import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CarouselAutoplayTriggerProps
  extends HTMLProps<'button'>,
    CarouselAutoplayTriggerBaseProps {}

export const CarouselAutoplayTrigger = (props: CarouselAutoplayTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getAutoplayTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
