import { Carousel } from '@ark-ui/react/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

export const ThumbnailIndicator = () => {
  return (
    <Carousel.Root className={styles.Root} defaultPage={0} slideCount={images.length}>
      <Carousel.Control className={styles.Control}>
        <Carousel.PrevTrigger className={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.ItemGroup className={styles.ItemGroup}>
          {images.map((image, index) => (
            <Carousel.Item className={styles.Item} key={index} index={index}>
              <img src={image.src} alt={image.alt} width="500" height="300" />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.NextTrigger className={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup className={styles.IndicatorGroup}>
        {images.map((image, index) => (
          <Carousel.Indicator className={styles.ThumbnailIndicator} key={index} index={index}>
            <img src={image.src} alt={image.alt} width="500" height="300" />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
