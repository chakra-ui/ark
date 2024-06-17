import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CarouselPrevTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    CarouselPrevTriggerBaseProps {}

export const CarouselPrevTrigger = (props: CarouselPrevTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
