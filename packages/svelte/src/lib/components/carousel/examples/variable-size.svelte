<script lang="ts">
  import { Carousel } from '../'

  const items = [
    { id: '1', width: '120px', label: 'Small' },
    { id: '2', width: '200px', label: 'Medium Size' },
    { id: '3', width: '80px', label: 'XS' },
    { id: '4', width: '250px', label: 'Large Content Here' },
    { id: '5', width: '150px', label: 'Regular' },
  ]
</script>

<Carousel.Root slideCount={items.length} autoSize spacing="8px">
  <Carousel.Control>
    <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
    <Carousel.NextTrigger>Next</Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.ItemGroup>
    {#each items as item, index}
      <Carousel.Item {index} snapAlign="center">
        <div
          style:width={item.width}
          style:height="100px"
          style:display="flex"
          style:align-items="center"
          style:justify-content="center"
          style:background-color="#f0f0f0"
          style:border-radius="8px"
          style:font-size="14px"
          style:font-weight="500"
        >
          {item.label}
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.IndicatorGroup>
    {#each items as _, index}
      <Carousel.Indicator {index} />
    {/each}
  </Carousel.IndicatorGroup>
</Carousel.Root>
