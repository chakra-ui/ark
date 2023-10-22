import type { Meta } from '@storybook/react'
import { useState } from 'react'
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

export const Controlled = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideChange = (details: { index: number }) => {
    setCurrentIndex(details.index)
  }

  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
  ]

  return (
    <Carousel.Root index={currentIndex} onIndexChange={handleSlideChange}>
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

export const Customized = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
  ]
  return (
    <Carousel.Root
      align="center"
      loop={true}
      slidesPerView={2}
      spacing="16px"
      orientation="horizontal"
    >
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
