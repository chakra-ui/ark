<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselPrevTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CarouselPrevTriggerProps extends Assign<HTMLProps<'button'>, CarouselPrevTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ref = $bindable(null), ...props }: CarouselPrevTriggerProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getPrevTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
