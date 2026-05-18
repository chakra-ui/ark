import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CarouselPrevTriggerProps extends HTMLProps<'button'>, CarouselPrevTriggerBaseProps {}

export const CarouselPrevTrigger = (props: CarouselPrevTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
