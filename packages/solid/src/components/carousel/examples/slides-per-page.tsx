import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 })

export const SlidesPerPage = () => {
  return (
    <Carousel.Root class={styles.Root} slideCount={slides.length} slidesPerPage={2} spacing="20px">
      <Carousel.Control class={styles.Control}>
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <Index each={slides}>
          {(_, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <div class={styles.Slide}>Slide {index + 1}</div>
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
            <Index each={api().pageSnapPoints}>
              {(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}
            </Index>
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
