import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
  type CarouselProps,
} from '~/components/ui/carousel'
import { IconButton } from '~/components/ui/icon-button'

export const CarouselDemo = (props: CarouselProps) => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  return (
    <Carousel {...props}>
      <CarouselViewport>
        <CarouselSlideGroup>
          {images.map((image, index) => (
            <CarouselSlide key={index} index={index}>
              <img
                src={image}
                alt={`Slide Image ${index}`}
                style={{ height: '398px', width: '100%', objectFit: 'cover' }}
              />
            </CarouselSlide>
          ))}
        </CarouselSlideGroup>
        <CarouselControl>
          <CarouselPrevSlideTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Previous Slide">
              <FiChevronLeft />
            </IconButton>
          </CarouselPrevSlideTrigger>
          <CarouselIndicatorGroup>
            {images.map((_, index) => (
              <CarouselIndicator key={index} index={index} aria-label={`Goto slide ${index + 1}`} />
            ))}
          </CarouselIndicatorGroup>
          <CarouselNextSlideTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Next Slide">
              <FiChevronRight />
            </IconButton>
          </CarouselNextSlideTrigger>
        </CarouselControl>
      </CarouselViewport>
    </Carousel>
  )
}
