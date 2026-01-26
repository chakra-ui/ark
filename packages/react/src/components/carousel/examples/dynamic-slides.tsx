import { Carousel } from '@ark-ui/react/carousel'
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/carousel.module.css'

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
    <div className="stack">
      <Carousel.Root
        className={styles.Root}
        slideCount={slides.length}
        page={page}
        onPageChange={(details) => setPage(details.page)}
      >
        <Carousel.ItemGroup className={styles.ItemGroup}>
          {slides.map((slide, index) => (
            <Carousel.Item className={styles.Item} key={index} index={index}>
              <div className={styles.Slide}>Slide {slide + 1}</div>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.Control className={styles.Control}>
          <Carousel.PrevTrigger className={styles.Trigger}>
            <ArrowLeftIcon />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup className={styles.IndicatorGroup}>
            {slides.map((_, index) => (
              <Carousel.Indicator className={styles.Indicator} key={index} index={index} />
            ))}
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger className={styles.Trigger}>
            <ArrowRightIcon />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
      <button className={button.Root} onClick={addSlide}>
        <PlusIcon />
        Add Slide
      </button>
    </div>
  )
}
