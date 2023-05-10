import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HTMLArkProps<'div'>

export const CarouselSlideGroup = (props: CarouselSlideGroupProps) => {
  const carousel = useCarouselContext()
  const groupProps = mergeProps(() => carousel().slideGroupProps, props)
  return <ark.div {...groupProps} />
}
