<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseCarouselReturn } from './use-carousel.svelte'

  export interface CarouselRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseCarouselReturn
  }
  export interface CarouselRootProviderProps extends Assign<HTMLProps<'div'>, CarouselRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { CarouselProvider } from './use-carousel-context'

  let { ref = $bindable(null), value, ...props }: CarouselRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  CarouselProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
