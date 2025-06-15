<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseCarouselReturn } from './use-carousel.svelte'

  export interface CarouselRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseCarouselReturn
  }
  export interface CarouselRootProviderProps extends Assign<HTMLProps<'div'>, CarouselRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import CarouselContext from './carousel-context.svelte'

  let { value, ...props }: CarouselRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
</script>

<CarouselContext {value}>
  {#snippet render()}
    <Ark as="div" {...mergedProps} />
  {/snippet}
</CarouselContext>
