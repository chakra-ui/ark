<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
  import ArrowUpIcon from 'lucide-svelte/icons/arrow-up'
  import ArrowDownIcon from 'lucide-svelte/icons/arrow-down'
  import styles from 'styles/carousel.module.css'

  const images = [
    { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
    { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
    { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
    { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
    { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
  ]
</script>

<Carousel.Root class={styles.Root} orientation="vertical" slideCount={images.length}>
  <Carousel.Control class={styles.Control}>
    <Carousel.PrevTrigger class={styles.Trigger}>
      <ArrowUpIcon />
    </Carousel.PrevTrigger>
    <Carousel.NextTrigger class={styles.Trigger}>
      <ArrowDownIcon />
    </Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.ItemGroup class={styles.ItemGroup}>
    {#each images as image, index}
      <Carousel.Item class={styles.Item} {index}>
        <img src={image.src} alt={image.alt} width="500" height="300" />
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
    {#each images as _, index}
      <Carousel.Indicator class={styles.Indicator} {index} />
    {/each}
  </Carousel.IndicatorGroup>
</Carousel.Root>
