import { Carousel } from '@ark-ui/solid/carousel'
import { Index, createSignal } from 'solid-js'

export const DynamicSlides = () => {
  const [slides, setSlides] = createSignal([0, 1, 2, 3, 4])
  const [page, setPage] = createSignal(0)

  const addSlide = () => {
    setSlides((prevSlides) => {
      const max = Math.max(...prevSlides)
      return [...prevSlides, max + 1]
    })
  }

  return (
    <div>
      <Carousel.Root slideCount={slides().length} page={page()} onPageChange={(details) => setPage(details.page)}>
        <Carousel.Control>
          <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
          <Carousel.NextTrigger>Next</Carousel.NextTrigger>
        </Carousel.Control>
        <Carousel.IndicatorGroup>
          <Index each={slides()}>{(_, index) => <Carousel.Indicator index={index} />}</Index>
        </Carousel.IndicatorGroup>
        <Carousel.ItemGroup>
          <Index each={slides()}>
            {(slide, index) => (
              <Carousel.Item index={index}>
                <div
                  style={{
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    width: '100%',
                    height: '300px',
                    'background-color': `hsl(${(slide() * 60) % 360}, 70%, 60%)`,
                    color: 'white',
                    'font-size': '24px',
                    'font-weight': 'bold',
                    'border-radius': '8px',
                  }}
                >
                  Slide {slide()}
                </div>
              </Carousel.Item>
            )}
          </Index>
        </Carousel.ItemGroup>
      </Carousel.Root>
      <button onClick={addSlide} style={{ 'margin-top': '16px', padding: '8px 16px', cursor: 'pointer' }}>
        Add Slide
      </button>
    </div>
  )
}
