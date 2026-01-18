import { Carousel } from '@ark-ui/react/carousel'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

export const PauseOnHover = () => {
  return (
    <Carousel.Root className={styles.Root} slideCount={images.length} autoplay loop>
      <Carousel.Control className={styles.Control}>
        <Carousel.Context>
          {({ isPlaying }) => (
            <span className={styles.StatusText}>Autoplay is: {isPlaying ? 'playing' : 'paused'}</span>
          )}
        </Carousel.Context>
      </Carousel.Control>
      <Carousel.Context>
        {(api) => (
          <Carousel.ItemGroup
            className={styles.ItemGroup}
            onPointerOver={() => api.pause()}
            onPointerLeave={() => api.play()}
          >
            {images.map((image, index) => (
              <Carousel.Item className={styles.Item} key={index} index={index}>
                <img src={image.src} alt={image.alt} width="500" height="300" />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
        )}
      </Carousel.Context>
      <Carousel.IndicatorGroup className={styles.IndicatorGroup}>
        {images.map((_, index) => (
          <Carousel.Indicator className={styles.Indicator} key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
