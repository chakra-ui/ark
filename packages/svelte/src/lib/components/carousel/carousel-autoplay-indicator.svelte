<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface CarouselAutoplayIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    /**
     * The fallback snippet to render when autoplay is paused.
     */
    fallback?: Snippet
  }
  export interface CarouselAutoplayIndicatorProps extends Assign<HTMLProps<'span'>, CarouselAutoplayIndicatorBaseProps> {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { carouselAnatomy } from './carousel.anatomy'
  import { useCarouselContext } from './use-carousel-context'

  const parts = carouselAnatomy.build()

  let { ref = $bindable(null), children, fallback, ...props }: CarouselAutoplayIndicatorProps = $props()

  const carousel = useCarouselContext()
</script>

<Ark as="span" bind:ref {...parts.autoplayIndicator.attrs} {...props}>
  {#if carousel().isPlaying}
    {@render children?.()}
  {:else}
    {@render fallback?.()}
  {/if}
</Ark>
