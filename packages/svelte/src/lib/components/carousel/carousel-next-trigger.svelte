<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselNextTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CarouselNextTriggerProps extends Assign<HTMLProps<'button'>, CarouselNextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ref = $bindable(null), ...props }: CarouselNextTriggerProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getNextTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
