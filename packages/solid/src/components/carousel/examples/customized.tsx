import { Carousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')

export const Customized = () => {
  return (
    <Carousel.Root autoplay loop>
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
    </Carousel.Root>
  )
}
