import { Index, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Carousel } from './'
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
    <Carousel.Root>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        <Index each={images}>{(_, index) => <Carousel.Indicator index={index} />}</Index>
      </Carousel.IndicatorGroup>
      <Carousel.Viewport>
        <Carousel.ItemGroup>
          <Index each={images}>
            {(image, index) => (
              <Carousel.Item index={index}>
                <img src={image()} />
              </Carousel.Item>
            )}
          </Index>
        </Carousel.ItemGroup>
      </Carousel.Viewport>
    </Carousel.Root>
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
      <Carousel.Root
        index={currentIndex()}
        onIndexChange={(details) => setCurrentIndex(details.index)}
      >
        <Carousel.Control>
          <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
          <Carousel.NextTrigger>Next</Carousel.NextTrigger>
        </Carousel.Control>
        <Carousel.Viewport>
          <Carousel.ItemGroup>
            <Index each={images}>
              {(image, index) => (
                <Carousel.Item index={index}>
                  <img src={image()} />
                </Carousel.Item>
              )}
            </Index>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
      </Carousel.Root>
    </>
  )
}
