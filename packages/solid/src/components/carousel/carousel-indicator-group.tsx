import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselIndicatorGroupProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    CarouselIndicatorGroupBaseProps {}

export const CarouselIndicatorGroup = (props: CarouselIndicatorGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getIndicatorGroupProps(), props)

  return <ark.div {...mergedProps} />
}
