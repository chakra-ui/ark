import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/carousel.module.css'

export const DynamicSlides = () => {
  const [slides, setSlides] = createSignal([0, 1, 2, 3, 4])
  const [page, setPage] = createSignal(0)

  const addSlide = () => {
    setSlides((prevSlides) => {
      const max = Math.max(...prevSlides)
      return [...prevSlides, max + 1]
    })
  }

  return (
    <div class="stack">
      <Carousel.Root
        class={styles.Root}
        slideCount={slides().length}
        page={page()}
        onPageChange={(details) => setPage(details.page)}
      >
        <Carousel.ItemGroup class={styles.ItemGroup}>
          <Index each={slides()}>
            {(slide, index) => (
              <Carousel.Item class={styles.Item} index={index}>
                <div class={styles.Slide}>Slide {slide() + 1}</div>
              </Carousel.Item>
            )}
          </Index>
        </Carousel.ItemGroup>
        <Carousel.Control class={styles.Control}>
          <Carousel.PrevTrigger class={styles.Trigger}>
            <ArrowLeftIcon />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
            <Index each={slides()}>{(_, index) => <Carousel.Indicator class={styles.Indicator} index={index} />}</Index>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger class={styles.Trigger}>
            <ArrowRightIcon />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
      <button class={button.Root} onClick={addSlide}>
        <PlusIcon />
        Add Slide
      </button>
    </div>
  )
}
