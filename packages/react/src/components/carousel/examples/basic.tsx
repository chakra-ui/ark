import { Carousel } from '@ark-ui/react/carousel'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')

export const Basic = () => {
  return (
    <Carousel.Root autoplay={{ delay: 1000 }} loop>
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
