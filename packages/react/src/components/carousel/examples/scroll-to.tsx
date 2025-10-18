import { Carousel } from '@ark-ui/react/carousel'

export const ScrollTo = () => {
  return (
    <Carousel.Root slideCount={5}>
      <Carousel.Context>
        {(api) => <button onClick={() => api.scrollToIndex(3)}>Go to slide 4</button>}
      </Carousel.Context>
      <Carousel.ItemGroup>
        {Array.from({ length: 5 }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '300px',
                backgroundColor: '#f0f0f0',
                fontSize: '24px',
                fontWeight: 'bold',
                borderRadius: '8px',
              }}
            >
              Slide {index + 1}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        {Array.from({ length: 5 }, (_, index) => (
          <Carousel.Indicator key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
