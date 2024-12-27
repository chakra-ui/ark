import { Carousel, useCarousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')

export const RootProvider = () => {
  const carousel = useCarousel()
  return (
    <>
      <button onClick={() => carousel().scrollToIndex(2)}>Scroll to #3</button>
      <Carousel.RootProvider value={carousel}>
        <Carousel.Control>
          <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
          <Carousel.NextTrigger>Next</Carousel.NextTrigger>
        </Carousel.Control>
        <Carousel.IndicatorGroup>
          <Index each={images}>{(_, index) => <Carousel.Indicator index={index} />}</Index>
        </Carousel.IndicatorGroup>
        <Carousel.ItemGroup>
          <Index each={images}>
            {(image, index) => (
              <Carousel.Item index={index}>
                <img src={image()} alt={`Slide ${index}`} />
              </Carousel.Item>
            )}
          </Index>
        </Carousel.ItemGroup>
      </Carousel.RootProvider>
    </>
  )
}
