import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

export const Vertical = () => {
  return (
    <Carousel.Root class={styles.Root} orientation="vertical" slideCount={images.length}>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <Index each={images}>
          {(image, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <img src={image().src} alt={image().alt} width="500" height="300" />
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Control class={styles.Control}>
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowUpIcon />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
          <Index each={images}>{(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}</Index>
        </Carousel.IndicatorGroup>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowDownIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
