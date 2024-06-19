import { carouselAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface CarouselControlBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselControlProps extends HTMLProps<'div'>, CarouselControlBaseProps {}

export const CarouselControl = (props: CarouselControlProps) => {
  const mergedProps = mergeProps(() => carouselAnatomy.build().control.attrs, props)

  return <ark.div {...mergedProps} />
}
