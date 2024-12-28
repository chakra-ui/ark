import { Carousel } from '@ark-ui/react/carousel'
import { useState } from 'react'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)

export const Controlled = () => {
  const [page, setPage] = useState(0)

  return (
    <Carousel.Root page={page} onPageChange={(e) => setPage(e.page)}>
      <Carousel.Control>
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
