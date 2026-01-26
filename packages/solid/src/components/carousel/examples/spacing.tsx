import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 })

export const Spacing = () => {
  return (
    <Carousel.Root class={styles.Root} slideCount={slides.length} slidesPerPage={1.5} spacing="48px">
      <span class={styles.StatusText}>spacing='48px'</span>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <Index each={slides}>
          {(_, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <div class={styles.Slide}>{index + 1}</div>
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
      <Carousel.Control class={styles.Control} data-align="center">
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.Context>
          {(api) => (
            <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
              <Index each={api().pageSnapPoints}>
                {(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}
              </Index>
            </Carousel.IndicatorGroup>
          )}
        </Carousel.Context>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
