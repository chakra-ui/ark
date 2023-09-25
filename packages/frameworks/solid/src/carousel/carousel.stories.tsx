import { Index, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
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
      <CarouselIndicatorGroup>
        <Index each={images}>{(_, index) => <CarouselIndicator index={index} />}</Index>
      </CarouselIndicatorGroup>
      <CarouselViewport>
        <CarouselSlideGroup>
          <Index each={images}>
            {(image, index) => (
              <CarouselSlide index={index}>
                <img src={image()} />
              </CarouselSlide>
            )}
          </Index>
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
            <Index each={images}>
              {(image, index) => (
                <CarouselSlide index={index}>
                  <img src={image()} />
                </CarouselSlide>
              )}
            </Index>
          </CarouselSlideGroup>
        </CarouselViewport>
      </Carousel>
    </>
  )
}
