import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-solid'
import { For } from 'solid-js'
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
    <Carousel.Root class={styles.Root} orientation="vertical" count={images.length}>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <For each={images} keyed={false}>
          {(image, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <img src={image().src} alt={image().alt} width="500" height="300" />
            </Carousel.Item>
          )}
        </For>
      </Carousel.ItemGroup>
      <Carousel.Control class={styles.Control}>
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowUpIcon />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
          <For each={images} keyed={false}>
            {(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}
          </For>
        </Carousel.IndicatorGroup>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowDownIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
