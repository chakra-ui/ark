<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselProgressTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface CarouselProgressTextProps extends Assign<HTMLProps<'span'>, CarouselProgressTextBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { carouselAnatomy } from './carousel.anatomy'
  import { useCarouselContext } from './use-carousel-context'

  const parts = carouselAnatomy.build()

  let { ref = $bindable(null), children, ...props }: CarouselProgressTextProps = $props()

  const carousel = useCarouselContext()

  const progressText = $derived(() => {
    const currentPage = carousel().page + 1
    const totalPages = carousel().pageSnapPoints.length
    return `${currentPage} / ${totalPages}`
  })
</script>

<Ark as="span" bind:ref {...parts.progressText.attrs} {...props}>
  {#if children}
    {@render children()}
  {:else}
    {progressText()}
  {/if}
</Ark>
