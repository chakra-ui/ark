<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CarouselControlProps extends Assign<HTMLProps<'div'>, CarouselControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ref = $bindable(), ...props }: CarouselControlProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
