import { carouselAnatomy } from '@ark-ui/anatomy'
import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'

export interface CarouselControlProps extends HTMLArkProps<'div'> {}

export const CarouselControl = (props: CarouselControlProps) => {
  const mergedProps = mergeProps(() => carouselAnatomy.build().control.attrs, props)

  return <ark.div {...mergedProps} />
}
