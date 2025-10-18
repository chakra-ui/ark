import { Carousel } from '@ark-ui/react/carousel'
import { useState } from 'react'

export const DynamicSlides = () => {
  const [slides, setSlides] = useState([0, 1, 2, 3, 4])
  const [page, setPage] = useState(0)

  const addSlide = () => {
    setSlides((prevSlides) => {
      const max = Math.max(...prevSlides)
      return [...prevSlides, max + 1]
    })
  }

  return (
    <div>
      <Carousel.Root slideCount={slides.length} page={page} onPageChange={(details) => setPage(details.page)}>
        <Carousel.Control>
          <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
          <Carousel.NextTrigger>Next</Carousel.NextTrigger>
        </Carousel.Control>
        <Carousel.IndicatorGroup>
          {slides.map((_, index) => (
            <Carousel.Indicator key={index} index={index} />
          ))}
        </Carousel.IndicatorGroup>
        <Carousel.ItemGroup>
          {slides.map((slide, index) => (
            <Carousel.Item key={index} index={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '300px',
                  backgroundColor: `hsl(${(slide * 60) % 360}, 70%, 60%)`,
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                }}
              >
                Slide {slide}
              </div>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
      </Carousel.Root>
      <button onClick={addSlide} style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}>
        Add Slide
      </button>
    </div>
  )
}
