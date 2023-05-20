import { For, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  Carousel,
  CarouselControl,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
} from './'
import './carousel.css'

const meta: Meta = {
  title: 'Carousel',
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
      <CarouselControl>
        <CarouselPrevSlideTrigger>Previous</CarouselPrevSlideTrigger>
        <CarouselNextSlideTrigger>Next</CarouselNextSlideTrigger>
      </CarouselControl>
      <CarouselViewport>
        <CarouselSlideGroup>
          <For each={images}>
            {(image, index) => (
              <CarouselSlide index={index()}>
                <img
                  src={image}
                  alt=""
                  style={{ height: '300px', width: '100%', 'object-fit': 'cover' }}
                />
              </CarouselSlide>
            )}
          </For>
        </CarouselSlideGroup>
      </CarouselViewport>
    </Carousel>
  )
}

export const Controlled = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  const [currentIndex, setCurrentIndex] = createSignal(0)

  return (
    <>
      <Carousel index={currentIndex()} onSlideChange={(details) => setCurrentIndex(details.index)}>
        <CarouselControl>
          <CarouselPrevSlideTrigger>Previous</CarouselPrevSlideTrigger>
          <CarouselNextSlideTrigger>Next</CarouselNextSlideTrigger>
        </CarouselControl>
        <CarouselViewport>
          <CarouselSlideGroup>
            <For each={images}>
              {(image, index) => (
                <CarouselSlide index={index()}>
                  <img
                    src={image}
                    alt=""
                    style={{ height: '300px', width: '100%', 'object-fit': 'cover' }}
                  />
                </CarouselSlide>
              )}
            </For>
          </CarouselSlideGroup>
        </CarouselViewport>
      </Carousel>
    </>
  )
}
