<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CarouselItemGroupBaseProps extends PolymorphicProps<'div'> {}
  export interface CarouselItemGroupProps extends Assign<HTMLProps<'div'>, CarouselItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ...props }: CarouselItemGroupProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getItemGroupProps(), props))
</script>

<Ark as="div" {...mergedProps} />
