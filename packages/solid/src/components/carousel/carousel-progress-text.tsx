import { createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'
import { useCarouselContext } from './use-carousel-context'

const parts = carouselAnatomy.build()

export interface CarouselProgressTextBaseProps extends PolymorphicProps<'span'> {}
export interface CarouselProgressTextProps extends HTMLProps<'span'>, CarouselProgressTextBaseProps {}

export const CarouselProgressText = (props: CarouselProgressTextProps) => {
  const api = useCarouselContext()

  const progressText = createMemo(() => {
    const currentPage = api().page + 1
    const totalPages = api().pageSnapPoints.length
    return `${currentPage} / ${totalPages}`
  })

  return (
    <ark.span {...parts.progressText.attrs} {...props}>
      {props.children || progressText()}
    </ark.span>
  )
}
