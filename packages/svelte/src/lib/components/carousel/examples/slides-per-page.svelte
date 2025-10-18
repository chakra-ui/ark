<script>
  import { Carousel } from '@ark-ui/svelte/carousel'

  const slides = Array.from({ length: 5 }, (_, i) => i)
</script>

<Carousel.Root slideCount={slides.length} slidesPerPage={2} spacing="20px">
  <Carousel.Control>
    <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
    <Carousel.NextTrigger>Next</Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.ItemGroup>
    {#each slides as _, index}
      <Carousel.Item {index}>
        <div
          style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; background: #f0f0f0;"
        >
          Slide {index + 1}
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.Context>
    {#snippet render(api)}
      <Carousel.IndicatorGroup>
        {#each api().pageSnapPoints as _, index}
          <Carousel.Indicator {index} />
        {/each}
      </Carousel.IndicatorGroup>
    {/snippet}
  </Carousel.Context>
</Carousel.Root>
