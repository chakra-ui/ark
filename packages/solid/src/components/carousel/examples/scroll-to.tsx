import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 })

export const ScrollTo = () => {
  return (
    <Carousel.Root class={styles.Root} slideCount={slides.length}>
      <Carousel.Context>
        {(api) => (
          <button class={button.Root} onClick={() => api().scrollToIndex(3)}>
            Go to slide 4
          </button>
        )}
      </Carousel.Context>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <Index each={slides}>
          {(_, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <div class={styles.Slide}>Slide {index + 1}</div>
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Control class={styles.Control}>
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
        <Index each={slides}>{(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}</Index>
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
