import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 })

export const Spacing = () => {
  return (
    <Carousel.Root class={styles.Root} count={slides.length} slidesPerPage={1.5} spacing="48px">
      <span class={styles.StatusText}>spacing='48px'</span>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <For each={slides} keyed={false}>
          {(_, index) => (
            <Carousel.Item class={styles.Item} index={index}>
              <div class={styles.Slide}>{index + 1}</div>
            </Carousel.Item>
          )}
        </For>
      </Carousel.ItemGroup>
      <Carousel.Control class={styles.Control} data-align="center">
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.Context>
          {(api) => (
            <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
              <For each={api().pageSnapPoints} keyed={false}>
                {(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}
              </For>
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
