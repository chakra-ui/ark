import { forwardRef, useMemo } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'
import { useCarouselContext } from './use-carousel-context'

const parts = carouselAnatomy.build()

export interface CarouselProgressTextBaseProps extends PolymorphicProps {}
export interface CarouselProgressTextProps extends HTMLProps<'span'>, CarouselProgressTextBaseProps {}

export const CarouselProgressText = forwardRef<HTMLSpanElement, CarouselProgressTextProps>((props, ref) => {
  const carousel = useCarouselContext()

  const progressText = useMemo(() => {
    const currentPage = carousel.page + 1
    const totalPages = carousel.pageSnapPoints.length
    return `${currentPage} / ${totalPages}`
  }, [carousel.page, carousel.pageSnapPoints.length])

  return (
    <ark.span ref={ref} {...parts.progressText.attrs} {...props}>
      {props.children || progressText}
    </ark.span>
  )
})

CarouselProgressText.displayName = 'CarouselProgressText'
