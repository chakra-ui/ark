<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
  import styles from 'styles/carousel.module.css'

  const items = [
    { id: '1', width: '120px', label: 'Small' },
    { id: '2', width: '200px', label: 'Medium Size' },
    { id: '3', width: '80px', label: 'XS' },
    { id: '4', width: '250px', label: 'Large Content Here' },
    { id: '5', width: '150px', label: 'Regular' },
  ]
</script>

<Carousel.Root class={styles.Root} slideCount={items.length} autoSize spacing="8px">
  <Carousel.Control class={styles.Control}>
    <Carousel.PrevTrigger class={styles.Trigger}>
      <ArrowLeftIcon />
    </Carousel.PrevTrigger>
    <Carousel.NextTrigger class={styles.Trigger}>
      <ArrowRightIcon />
    </Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.ItemGroup class={styles.ItemGroup}>
    {#each items as item, index}
      <Carousel.Item {index} snapAlign="center">
        <div class={styles.Slide} style:width={item.width} style:height="6rem">
          {item.label}
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.Context>
    {#snippet render(api)}
      <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
        {#each api().pageSnapPoints as _, index}
          <Carousel.Indicator class={styles.Indicator} {index} />
        {/each}
      </Carousel.IndicatorGroup>
    {/snippet}
  </Carousel.Context>
</Carousel.Root>
