import { Carousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

export const Autoplay = () => {
  return (
    <Carousel.Root autoplay loop>
      <Carousel.Control>
        <Carousel.AutoplayTrigger>Play or Pause</Carousel.AutoplayTrigger>
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
