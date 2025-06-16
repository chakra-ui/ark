<script>
  import { Carousel } from '@ark-ui/svelte/carousel'

  const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
</script>

<Carousel.Root defaultPage={0} slideCount={images.length} autoplay={{ delay: 3000 }}>
  <Carousel.Control>
    <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
    <Carousel.AutoplayTrigger>Toggle Autoplay</Carousel.AutoplayTrigger>
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
