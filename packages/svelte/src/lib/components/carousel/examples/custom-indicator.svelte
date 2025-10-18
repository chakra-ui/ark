<script>
  import { Carousel } from '@ark-ui/svelte/carousel'

  const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
</script>

<Carousel.Root defaultPage={0} slideCount={images.length}>
  <Carousel.Control>
    <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
    <Carousel.NextTrigger>Next</Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.ItemGroup>
    {#each images as image, index}
      <Carousel.Item {index}>
        <img src={image} alt="Slide {index}" style="width: 100%; height: 300px; object-fit: cover;" />
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.Context>
    {#snippet render(api)}
      <Carousel.IndicatorGroup style="display: flex; gap: 8px; margin-top: 16px;">
        {#each images as image, index}
          <Carousel.Indicator {index}>
            <img
              src={image}
              alt="Thumbnail {index}"
              style="
                width: 60px;
                height: 40px;
                object-fit: cover;
                cursor: pointer;
                border: {api().page === index ? '2px solid #0066ff' : '2px solid transparent'};
                border-radius: 4px;
                opacity: {api().page === index ? 1 : 0.6};
                transition: all 0.2s;
              "
            />
          </Carousel.Indicator>
        {/each}
      </Carousel.IndicatorGroup>
    {/snippet}
  </Carousel.Context>
</Carousel.Root>
