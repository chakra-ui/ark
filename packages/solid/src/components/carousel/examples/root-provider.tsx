import { Carousel, useCarousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

export const RootProvider = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  const carousel = useCarousel()

  return (
    <>
      <button onClick={() => carousel().scrollToNext()}>Next</button>

      <Carousel.RootProvider value={carousel}>
        <Carousel.Control>
          <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
          <Carousel.NextTrigger>Next</Carousel.NextTrigger>
        </Carousel.Control>
        <Carousel.IndicatorGroup>
          <Index each={images}>
            {(_, index) => <Carousel.Indicator index={index}>{index + 1}</Carousel.Indicator>}
          </Index>
        </Carousel.IndicatorGroup>
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
      </Carousel.RootProvider>
    </>
  )
}
