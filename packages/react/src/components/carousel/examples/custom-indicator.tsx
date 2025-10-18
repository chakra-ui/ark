import { Carousel } from '@ark-ui/react/carousel'

export const CustomIndicator = () => {
  const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

  return (
    <Carousel.Root defaultPage={0} slideCount={images.length}>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index}>
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            {images.map((image, index) => (
              <Carousel.Indicator key={index} index={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: '60px',
                    height: '40px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: api.page === index ? '2px solid #0066ff' : '2px solid transparent',
                    borderRadius: '4px',
                    opacity: api.page === index ? 1 : 0.6,
                    transition: 'all 0.2s',
                  }}
                />
              </Carousel.Indicator>
            ))}
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
