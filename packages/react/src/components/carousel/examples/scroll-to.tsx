import { Carousel } from '@ark-ui/react/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/carousel.module.css'

export const ScrollTo = () => {
  return (
    <Carousel.Root className={styles.Root} slideCount={5}>
      <Carousel.Context>
        {(api) => (
          <button className={button.Root} onClick={() => api.scrollToIndex(3)}>
            Go to slide 4
          </button>
        )}
      </Carousel.Context>
      <Carousel.ItemGroup className={styles.ItemGroup}>
        {Array.from({ length: 5 }, (_, index) => (
          <Carousel.Item className={styles.Item} key={index} index={index}>
            <div className={styles.Slide}>Slide {index + 1}</div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.Control}>
        <Carousel.PrevTrigger className={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup className={styles.IndicatorGroup}>
        {Array.from({ length: 5 }, (_, index) => (
          <Carousel.Indicator className={styles.Indicator} key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
