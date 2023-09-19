import { carouselAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = (props: CarouselControlProps) => {
  const mergedProps = mergeProps(() => carouselAnatomy.build().control.attrs, props)

  return <ark.div {...mergedProps} />
}
