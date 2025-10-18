<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
</script>

<Carousel.Root slideCount={5}>
  <Carousel.Context>
    {#snippet render(carousel)}
      <button onclick={() => carousel().scrollToIndex(3)}>Go to slide 4</button>
    {/snippet}
  </Carousel.Context>
  <Carousel.ItemGroup>
    {#each Array.from({ length: 5 }) as _, index}
      <Carousel.Item {index}>
        <div
          style="display: flex; align-items: center; justify-content: center; width: 100%; height: 300px; background-color: #f0f0f0; font-size: 24px; font-weight: bold; border-radius: 8px;"
        >
          Slide {index + 1}
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.Control>
    <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
    <Carousel.NextTrigger>Next</Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.IndicatorGroup>
    {#each Array.from({ length: 5 }) as _, index}
      <Carousel.Indicator {index} />
    {/each}
  </Carousel.IndicatorGroup>
</Carousel.Root>
