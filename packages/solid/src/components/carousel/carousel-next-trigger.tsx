import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CarouselNextTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    CarouselNextTriggerBaseProps {}

export const CarouselNextTrigger = (props: CarouselNextTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
