<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
  import styles from 'styles/carousel.module.css'

  const slides = [0, 1, 2, 3, 4]
</script>

<Carousel.Root class={styles.Root} slideCount={slides.length} slidesPerPage={1.5} spacing="48px">
  <span class={styles.StatusText}>spacing='48px'</span>
  <Carousel.ItemGroup class={styles.ItemGroup}>
    {#each slides as _, index}
      <Carousel.Item class={styles.Item} {index}>
        <div class={styles.Slide}>{index + 1}</div>
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.Control class={styles.Control} data-align="center">
    <Carousel.PrevTrigger class={styles.Trigger}>
      <ArrowLeftIcon />
    </Carousel.PrevTrigger>
    <Carousel.Context>
      {#snippet render(api)}
        <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
          {#each api().pageSnapPoints as _, index}
            <Carousel.Indicator class={styles.Indicator} {index} />
          {/each}
        </Carousel.IndicatorGroup>
      {/snippet}
    </Carousel.Context>
    <Carousel.NextTrigger class={styles.Trigger}>
      <ArrowRightIcon />
    </Carousel.NextTrigger>
  </Carousel.Control>
</Carousel.Root>
