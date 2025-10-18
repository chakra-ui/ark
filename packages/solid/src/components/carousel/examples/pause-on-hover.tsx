import { Carousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

export const PauseOnHover = () => {
  return (
    <Carousel.Root slideCount={images.length} autoplay loop>
      <Carousel.Control>
        <Carousel.Context>
          {(carousel) => `Autoplay is: ${carousel().isPlaying ? 'playing' : 'paused'}`}
        </Carousel.Context>
      </Carousel.Control>
      <Carousel.Context>
        {(api) => (
          <Carousel.ItemGroup onPointerOver={() => api().pause()} onPointerLeave={() => api().play()}>
            <Index each={images}>
              {(image, index) => (
                <Carousel.Item index={index}>
                  <img src={image()} alt={`Slide ${index}`} />
                </Carousel.Item>
              )}
            </Index>
          </Carousel.ItemGroup>
        )}
      </Carousel.Context>
      <Carousel.IndicatorGroup>
        <Index each={images}>{(_, index) => <Carousel.Indicator index={index} />}</Index>
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
