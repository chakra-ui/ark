import { Carousel } from '@ark-ui/solid/carousel'
import { For } from 'solid-js'
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
    <Carousel.Root class={styles.Root} count={images.length} autoPlay loop>
      <Carousel.Control class={styles.Control}>
        <Carousel.Context>
          {(carousel) => (
            <span class={styles.StatusText}>Autoplay is: {carousel().isPlaying ? 'playing' : 'paused'}</span>
          )}
        </Carousel.Context>
      </Carousel.Control>
      <Carousel.Context>
        {(api) => (
          <Carousel.ItemGroup
            class={styles.ItemGroup}
            onPointerOver={() => api().pause()}
            onPointerLeave={() => api().play()}
          >
            <For each={images} keyed={false}>
              {(image, index) => (
                <Carousel.Item class={styles.Item} index={index}>
                  <img src={image().src} alt={image().alt} width="500" height="300" />
                </Carousel.Item>
              )}
            </For>
          </Carousel.ItemGroup>
        )}
      </Carousel.Context>
      <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
        <For each={images} keyed={false}>
          {(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}
        </For>
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
