import type { Meta } from '@storybook/react'
import { Carousel } from './'
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
  ]
  return (
    <Carousel.Root>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        {images.map((_, index) => (
          <Carousel.Indicator key={index} index={index}>
            {index + 1}
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
      <Carousel.Viewport>
        <Carousel.ItemGroup>
          {images.map((image, index) => (
            <Carousel.Item key={index} index={index}>
              <img src={image} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
      </Carousel.Viewport>
    </Carousel.Root>
  )
}
