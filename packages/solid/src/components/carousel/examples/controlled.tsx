import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

export const Controlled = () => {
  const [page, setPage] = createSignal(0)

  return (
    <Carousel.Root
      class={styles.Root}
      slideCount={images.length}
      page={page()}
      onPageChange={(details) => setPage(details.page)}
    >
      <Carousel.Control class={styles.Control}>
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.ItemGroup class={styles.ItemGroup}>
          <Index each={images}>
            {(image, index) => (
              <Carousel.Item class={styles.Item} index={index}>
                <img src={image().src} alt={image().alt} width="500" height="300" />
              </Carousel.Item>
            )}
          </Index>
        </Carousel.ItemGroup>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
        <Index each={images}>{(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}</Index>
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
