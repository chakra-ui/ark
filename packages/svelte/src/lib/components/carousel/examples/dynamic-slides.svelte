<script>
  import { Carousel } from '@ark-ui/svelte/carousel'

  let slides = $state([0, 1, 2, 3, 4])
  let page = $state(0)

  function addSlide() {
    const max = Math.max(...slides)
    slides = [...slides, max + 1]
  }
</script>

<div>
  <Carousel.Root bind:page slideCount={slides.length}>
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      {#each slides as _, index}
        <Carousel.Indicator {index} />
      {/each}
    </Carousel.IndicatorGroup>
    <Carousel.ItemGroup>
      {#each slides as slide, index}
        <Carousel.Item {index}>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 300px;
              background-color: hsl({(slide * 60) % 360}, 70%, 60%);
              color: white;
              font-size: 24px;
              font-weight: bold;
              border-radius: 8px;
            "
          >
            Slide {slide}
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.ItemGroup>
  </Carousel.Root>
  <button onclick={addSlide} style="margin-top: 16px; padding: 8px 16px; cursor: pointer;">Add Slide</button>
</div>
