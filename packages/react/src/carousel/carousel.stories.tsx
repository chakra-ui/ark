import type { Meta } from '@storybook/react'
import {
  Carousel,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
} from './'
import './carousel.css'

type CarouselType = typeof Carousel

const meta: Meta<CarouselType> = {
  title: 'Carousel',
  component: Carousel,
}

export default meta

export const Basic = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  return (
    <Carousel>
      <CarouselPrevSlideTrigger>Previous</CarouselPrevSlideTrigger>
      <CarouselNextSlideTrigger>Next</CarouselNextSlideTrigger>
      <CarouselViewport>
        <CarouselSlideGroup>
          {images.map((image, index) => (
            <CarouselSlide key={index} index={index}>
              <img
                src={image}
                alt=""
                style={{ height: '300px', width: '100%', objectFit: 'cover' }}
              />
            </CarouselSlide>
          ))}
        </CarouselSlideGroup>
      </CarouselViewport>
    </Carousel>
  )
}
