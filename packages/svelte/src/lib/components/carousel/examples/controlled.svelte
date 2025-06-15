<script>
  import { Carousel } from '@ark-ui/svelte/carousel'

  const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
  let page = $state(0)
</script>

<div>
  <div>Current page: {page}</div>
  <Carousel.Root bind:page slideCount={images.length}>
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
  </Carousel.Root>
</div>
