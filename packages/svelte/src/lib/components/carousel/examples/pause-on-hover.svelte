<script>
  import { Carousel } from '@ark-ui/svelte/carousel'

  const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
</script>

<Carousel.Root slideCount={images.length} autoplay loop>
  <Carousel.Control>
    <Carousel.Context>
      {#snippet render(api)}
        Autoplay is: {api().isPlaying ? 'playing' : 'paused'}
      {/snippet}
    </Carousel.Context>
  </Carousel.Control>
  <Carousel.Context>
    {#snippet render(api)}
      <Carousel.ItemGroup onpointerover={() => api().pause()} onpointerleave={() => api().play()}>
        {#each images as image, index}
          <Carousel.Item {index}>
            <img src={image} alt="Slide {index}" />
          </Carousel.Item>
        {/each}
      </Carousel.ItemGroup>
    {/snippet}
  </Carousel.Context>
  <Carousel.IndicatorGroup>
    {#each images as _, index}
      <Carousel.Indicator {index} />
    {/each}
  </Carousel.IndicatorGroup>
</Carousel.Root>
