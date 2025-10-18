import { Carousel } from '@ark-ui/solid/carousel'
import { Index } from 'solid-js'

export const ScrollTo = () => {
  return (
    <Carousel.Root slideCount={5}>
      <Carousel.Context>
        {(api) => <button onClick={() => api().scrollToIndex(3)}>Go to slide 4</button>}
      </Carousel.Context>
      <Carousel.ItemGroup>
        <Index each={Array.from({ length: 5 })}>
          {(_, index) => (
            <Carousel.Item index={index}>
              <div
                style={{
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                  width: '100%',
                  height: '300px',
                  'background-color': '#f0f0f0',
                  'font-size': '24px',
                  'font-weight': 'bold',
                  'border-radius': '8px',
                }}
              >
                Slide {index + 1}
              </div>
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        <Index each={Array.from({ length: 5 })}>{(_, index) => <Carousel.Indicator index={index} />}</Index>
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
