<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface CarouselAutoplayIndicatorBaseProps {
    /**
     * The snippet to render when autoplay is paused.
     */
    paused: Snippet
    /**
     * The snippet to render when autoplay is playing.
     */
    playing: Snippet
  }
  export interface CarouselAutoplayIndicatorProps extends CarouselAutoplayIndicatorBaseProps {}
</script>

<script lang="ts">
  import { useCarouselContext } from './use-carousel-context'

  let { paused, playing }: CarouselAutoplayIndicatorProps = $props()

  const carousel = useCarouselContext()
</script>

{#if carousel().isPlaying}
  {@render paused()}
{:else}
  {@render playing()}
{/if}
