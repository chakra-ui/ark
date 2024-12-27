import { Carousel } from '../'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')

export const ComponentUnderTest = (props: Carousel.RootProps) => {
  return (
    <Carousel.Root {...props}>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        {images.map((_, index) => (
          <Carousel.Indicator key={index} index={index} data-testid="indicator">
            {index + 1}
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
      <Carousel.ItemGroup>
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index} data-testid="item">
            <img src={image} alt="Slide #" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  )
}
