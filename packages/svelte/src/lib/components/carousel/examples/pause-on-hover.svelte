<script>
  import { Carousel } from '@ark-ui/svelte/carousel'
  import styles from 'styles/carousel.module.css'

  const images = [
    { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
    { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
    { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
    { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
    { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
  ]
</script>

<Carousel.Root class={styles.Root} slideCount={images.length} autoplay loop>
  <Carousel.Control class={styles.Control}>
    <Carousel.Context>
      {#snippet render(api)}
        <span class={styles.StatusText}>Autoplay is: {api().isPlaying ? 'playing' : 'paused'}</span>
      {/snippet}
    </Carousel.Context>
  </Carousel.Control>
  <Carousel.Context>
    {#snippet render(api)}
      <Carousel.ItemGroup class={styles.ItemGroup} onpointerover={() => api().pause()} onpointerleave={() => api().play()}>
        {#each images as image, index}
          <Carousel.Item class={styles.Item} {index}>
            <img src={image.src} alt={image.alt} width="500" height="300" />
          </Carousel.Item>
        {/each}
      </Carousel.ItemGroup>
    {/snippet}
  </Carousel.Context>
  <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
    {#each images as _, index}
      <Carousel.Indicator class={styles.Indicator} {index} />
    {/each}
  </Carousel.IndicatorGroup>
</Carousel.Root>
