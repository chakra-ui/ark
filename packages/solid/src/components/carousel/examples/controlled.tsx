import { Carousel } from '@ark-ui/solid/carousel'
import { Index, createSignal } from 'solid-js'

export const Controlled = () => {
  const [currentIndex, setCurrentIndex] = createSignal(0)

  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]

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
                  <img src={image()} alt={`Slide ${index}`} />
                </Carousel.Item>
              )}
            </Index>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
      </Carousel.Root>
    </>
  )
}
