import { Carousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

const slides = Array.from({ length: 5 }, (_, i) => i)

export const SlidesPerPage = () => {
  return (
    <Carousel.Root slideCount={slides.length} slidesPerPage={2} spacing="20px">
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        <Index each={slides}>
          {(_, index) => (
            <Carousel.Item index={index}>
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                  background: '#f0f0f0',
                }}
              >
                Slide {index + 1}
              </div>
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup>
            <Index each={api().pageSnapPoints}>{(_, index) => <Carousel.Indicator index={index} />}</Index>
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
