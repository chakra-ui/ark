<script>
  import { Carousel, useCarousel } from '@ark-ui/svelte/carousel'
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
  import styles from 'styles/carousel.module.css'

  const images = [
    { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
    { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
    { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
    { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
    { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
  ]

  const id = $props.id()
  const carousel = useCarousel({
    id,
    defaultPage: 0,
    slideCount: images.length,
  })
</script>

<div>
  <div>Current page: {carousel().page}</div>
  <Carousel.RootProvider class={styles.Root} value={carousel}>
    <Carousel.Control class={styles.Control}>
      <Carousel.PrevTrigger class={styles.Trigger}>
        <ArrowLeftIcon />
      </Carousel.PrevTrigger>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        {#each images as image, index}
          <Carousel.Item class={styles.Item} {index}>
            <img src={image.src} alt={image.alt} width="500" height="300" />
          </Carousel.Item>
        {/each}
      </Carousel.ItemGroup>
      <Carousel.NextTrigger class={styles.Trigger}>
        <ArrowRightIcon />
      </Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
      {#each images as _, index}
        <Carousel.Indicator class={styles.Indicator} {index} />
      {/each}
    </Carousel.IndicatorGroup>
  </Carousel.RootProvider>
</div>
