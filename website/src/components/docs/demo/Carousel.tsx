/* eslint-disable @next/next/no-img-element */
import { IconButton } from '@/components/shared/IconButton'
import { Stack } from '@/panda/jsx'
import { carousel } from '@/panda/recipes'
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
} from '@ark-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const DemoCarousel = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  return (
    <Carousel className={carousel()}>
      <Stack gap="4">
        <CarouselViewport>
          <CarouselSlideGroup>
            {images.map((image, index) => (
              <CarouselSlide key={index} index={index}>
                <img
                  src={image}
                  alt={`Slide Image ${index}`}
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
              </CarouselSlide>
            ))}
          </CarouselSlideGroup>
          <CarouselControl>
            <CarouselPrevSlideTrigger asChild>
              <IconButton
                variant="secondary"
                size="sm"
                borderRadius="full"
                icon={<FiChevronLeft />}
                aria-label="Previous Slide"
              />
            </CarouselPrevSlideTrigger>
            <CarouselNextSlideTrigger asChild>
              <IconButton
                variant="secondary"
                size="sm"
                borderRadius="full"
                icon={<FiChevronRight />}
                aria-label="Next Slide"
              />
            </CarouselNextSlideTrigger>
          </CarouselControl>
          <CarouselIndicatorGroup>
            {images.map((_, index) => (
              <CarouselIndicator key={index} index={index}>
                <span>Goto {index + 1}</span>
              </CarouselIndicator>
            ))}
          </CarouselIndicatorGroup>
        </CarouselViewport>
      </Stack>
    </Carousel>
  )
}
