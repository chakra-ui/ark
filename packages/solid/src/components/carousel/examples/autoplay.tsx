import { Carousel } from '@ark-ui/solid/carousel'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from 'lucide-solid'
import { Index } from 'solid-js'
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
    <Carousel.Root class={styles.Root} slideCount={images.length} autoplay loop>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <Index each={images}>
          {(image, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <img src={image().src} alt={image().alt} width="500" height="300" />
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Control class={styles.Control} data-justify="center">
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ChevronLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.AutoplayTrigger class={styles.AutoplayTrigger}>
          <Carousel.AutoplayIndicator fallback={<PlayIcon />}>
            <PauseIcon />
          </Carousel.AutoplayIndicator>
        </Carousel.AutoplayTrigger>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ChevronRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
