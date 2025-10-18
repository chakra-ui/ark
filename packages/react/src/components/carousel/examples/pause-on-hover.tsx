import { Carousel } from '@ark-ui/react/carousel'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

export const PauseOnHover = () => {
  return (
    <Carousel.Root slideCount={images.length} autoplay loop>
      <Carousel.Control>
        <Carousel.Context>{({ isPlaying }) => `Autoplay is: ${isPlaying ? 'playing' : 'paused'}`}</Carousel.Context>
      </Carousel.Control>
      <Carousel.Context>
        {(api) => (
          <Carousel.ItemGroup onPointerOver={() => api.pause()} onPointerLeave={() => api.play()}>
            {images.map((image, index) => (
              <Carousel.Item key={index} index={index}>
                <img src={image} alt={`Slide ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
        )}
      </Carousel.Context>
      <Carousel.IndicatorGroup>
        {images.map((_, index) => (
          <Carousel.Indicator key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
