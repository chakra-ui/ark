import { Carousel } from '@ark-ui/react/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import styles from 'styles/carousel.module.css'

export const SlidesPerPage = () => {
  const slides = Array.from({ length: 6 })

  return (
    <Carousel.Root className={styles.Root} slideCount={slides.length} slidesPerPage={2} spacing="20px">
      <Carousel.Control className={styles.Control}>
        <Carousel.PrevTrigger className={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup className={styles.ItemGroup}>
        {slides.map((_, index) => (
          <Carousel.Item className={styles.Item} key={index} index={index}>
            <div className={styles.Slide}>Slide {index + 1}</div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup className={styles.IndicatorGroup}>
            {api.pageSnapPoints.map((_, index) => (
              <Carousel.Indicator className={styles.Indicator} key={index} index={index} />
            ))}
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
