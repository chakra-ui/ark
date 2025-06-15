<script>
  import { Carousel, useCarousel } from '@ark-ui/svelte/carousel'

  const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
  const carousel = useCarousel({ defaultPage: 0, slideCount: images.length })
</script>

<div>
  <div>Current page: {carousel().page}</div>
  <Carousel.RootProvider value={carousel}>
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      {#each images as _, index}
        <Carousel.Indicator {index} />
      {/each}
    </Carousel.IndicatorGroup>
    <Carousel.ItemGroup>
      {#each images as image, index}
        <Carousel.Item {index}>
          <img src={image} alt="Slide {index}" />
        </Carousel.Item>
      {/each}
    </Carousel.ItemGroup>
  </Carousel.RootProvider>
</div>
