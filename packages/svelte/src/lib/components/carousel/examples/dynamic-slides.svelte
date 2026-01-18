<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/carousel.module.css'

  let slides = $state([0, 1, 2, 3, 4])

  function addSlide() {
    const max = Math.max(...slides)
    slides = [...slides, max + 1]
  }
</script>

<div>
  <button class={button.Root} onclick={addSlide}>Add Slide</button>
  <Carousel.Root class={styles.Root} slideCount={slides.length}>
    <Carousel.ItemGroup class={styles.ItemGroup}>
      {#each slides as slide, index}
        <Carousel.Item class={styles.Item} {index}>
          <div class={styles.Slide}>Slide {slide + 1}</div>
        </Carousel.Item>
      {/each}
    </Carousel.ItemGroup>
    <Carousel.Control class={styles.Control} data-align="center">
      <Carousel.PrevTrigger class={styles.Trigger}>
        <ArrowLeftIcon />
      </Carousel.PrevTrigger>
      <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
        {#each slides as _, index}
          <Carousel.Indicator class={styles.Indicator} {index} />
        {/each}
      </Carousel.IndicatorGroup>
      <Carousel.NextTrigger class={styles.Trigger}>
        <ArrowRightIcon />
      </Carousel.NextTrigger>
    </Carousel.Control>
  </Carousel.Root>
</div>
