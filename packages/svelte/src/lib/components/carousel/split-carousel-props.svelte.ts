import type { UseCarouselProps } from './use-carousel.svelte'

export const splitCarouselProps = <T extends UseCarouselProps>(props: T) => {
  const {
    allowMouseDrag,
    autoplay,
    defaultPage,
    id,
    ids,
    inViewThreshold,
    loop,
    onAutoplayStatusChange,
    onDragStatusChange,
    onPageChange,
    orientation,
    padding,
    page,
    slideCount,
    slidesPerMove,
    slidesPerPage,
    snapType,
    spacing,
    translations,
    ...localProps
  } = props

  const useCarouselProps: UseCarouselProps = {
    allowMouseDrag,
    autoplay,
    defaultPage,
    id,
    ids,
    inViewThreshold,
    loop,
    onAutoplayStatusChange,
    onDragStatusChange,
    onPageChange,
    orientation,
    padding,
    page,
    slideCount,
    slidesPerMove,
    slidesPerPage,
    snapType,
    spacing,
    translations,
  }

  return [useCarouselProps, localProps] as const
}
