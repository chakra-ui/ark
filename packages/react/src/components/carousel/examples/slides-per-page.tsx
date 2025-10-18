import { Carousel } from '@ark-ui/react/carousel'

export const SlidesPerPage = () => {
  const slides = Array.from({ length: 5 }, (_, i) => i)

  return (
    <Carousel.Root slideCount={slides.length} slidesPerPage={2} spacing="20px">
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        {slides.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <div
              style={{
                width: '100%',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
              }}
            >
              Slide {index + 1}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup>
            {api.pageSnapPoints.map((_, index) => (
              <Carousel.Indicator key={index} index={index} />
            ))}
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
