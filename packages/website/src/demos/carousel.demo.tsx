import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Carousel, IconButton, type CarouselProps } from '~/components/ui'

export const Demo = (props: CarouselProps) => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  return (
    <Carousel.Root {...props}>
      <Carousel.Viewport>
        <Carousel.ItemGroup>
          {images.map((image, index) => (
            <Carousel.Item key={index} index={index}>
              <img
                src={image}
                alt={`Slide Image ${index}`}
                style={{ height: '398px', width: '100%', objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.Control>
          <Carousel.PrevTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Previous Slide">
              <ChevronLeftIcon />
            </IconButton>
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            {images.map((_, index) => (
              <Carousel.Indicator
                key={index}
                index={index}
                aria-label={`Goto slide ${index + 1}`}
              />
            ))}
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Next Slide">
              <ChevronRightIcon />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Viewport>
    </Carousel.Root>
  )
}
