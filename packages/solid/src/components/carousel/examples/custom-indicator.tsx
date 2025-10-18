import { Carousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

export const CustomIndicator = () => {
  return (
    <Carousel.Root slideCount={images.length}>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        <Index each={images}>
          {(image, index) => (
            <Carousel.Item index={index}>
              <img
                src={image()}
                alt={`Slide ${index}`}
                style={{ width: '100%', height: '300px', 'object-fit': 'cover' }}
              />
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup style={{ display: 'flex', gap: '8px', 'margin-top': '16px' }}>
            <Index each={images}>
              {(image, index) => (
                <Carousel.Indicator index={index}>
                  <img
                    src={image()}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: '60px',
                      height: '40px',
                      'object-fit': 'cover',
                      cursor: 'pointer',
                      border: api().page === index ? '2px solid #0066ff' : '2px solid transparent',
                      'border-radius': '4px',
                      opacity: api().page === index ? 1 : 0.6,
                      transition: 'all 0.2s',
                    }}
                  />
                </Carousel.Indicator>
              )}
            </Index>
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
