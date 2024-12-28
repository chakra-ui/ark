import { Carousel } from '@ark-ui/react/carousel'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

export const Autoplay = () => {
  return (
    <Carousel.Root autoplay loop>
      <Carousel.Control>
        <Carousel.AutoplayTrigger>Play or Pause</Carousel.AutoplayTrigger>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        {images.map((_, index) => (
          <Carousel.Indicator key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>
      <Carousel.ItemGroup>
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index}>
            <img src={image} alt={`Slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  )
}
