<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CarouselAutoplayTriggerProps extends Assign<HTMLProps<'button'>, CarouselAutoplayTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ref = $bindable(null), ...props }: CarouselAutoplayTriggerProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getAutoplayTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
