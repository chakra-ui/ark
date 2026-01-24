<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/carousel.module.css'

  const slides = Array.from({ length: 6 })
</script>

<Carousel.Root class={styles.Root} slideCount={slides.length}>
  <Carousel.Context>
    {#snippet render(api)}
      <button class={button.Root} onclick={() => api().scrollToIndex(3)}>Go to slide 4</button>
    {/snippet}
  </Carousel.Context>
  <Carousel.ItemGroup class={styles.ItemGroup}>
    {#each slides as _, index}
      <Carousel.Item class={styles.Item} {index}>
        <div class={styles.Slide}>Slide {index + 1}</div>
      </Carousel.Item>
    {/each}
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
    {#each slides as _, index}
      <Carousel.Indicator class={styles.Indicator} {index} />
    {/each}
  </Carousel.IndicatorGroup>
</Carousel.Root>
