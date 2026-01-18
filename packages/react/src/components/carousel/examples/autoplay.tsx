import { Carousel } from '@ark-ui/react/carousel'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from 'lucide-react'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

export const Autoplay = () => {
  return (
    <Carousel.Root className={styles.Root} slideCount={images.length} autoplay loop>
      <Carousel.ItemGroup className={styles.ItemGroup}>
        {images.map((image, index) => (
          <Carousel.Item className={styles.Item} key={index} index={index}>
            <img src={image.src} alt={image.alt} width="500" height="300" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.Control} data-justify="center">
        <Carousel.PrevTrigger className={styles.Trigger}>
          <ChevronLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.AutoplayTrigger className={styles.AutoplayTrigger}>
          <Carousel.AutoplayIndicator fallback={<PlayIcon />}>
            <PauseIcon />
          </Carousel.AutoplayIndicator>
        </Carousel.AutoplayTrigger>
        <Carousel.NextTrigger className={styles.Trigger}>
          <ChevronRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
