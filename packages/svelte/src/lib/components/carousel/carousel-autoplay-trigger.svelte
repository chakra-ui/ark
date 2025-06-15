<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface CarouselAutoplayTriggerProps extends Assign<HTMLProps<'button'>, CarouselAutoplayTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ...props }: CarouselAutoplayTriggerProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getAutoplayTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
