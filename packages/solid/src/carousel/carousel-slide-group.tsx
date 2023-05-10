import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HTMLArkProps<'div'>

export const CarouselSlideGroup = (props: CarouselSlideGroupProps) => {
  const carousel = useCarouselContext()

  return <ark.div {...carousel().slideGroupProps} {...props} />
}
