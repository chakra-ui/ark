<script module lang="ts">
  import type { IndicatorProps } from '@zag-js/carousel'
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'button'> {}
  export interface CarouselIndicatorProps extends Assign<HTMLProps<'button'>, CarouselIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { index, readOnly, ...props }: CarouselIndicatorProps = $props()

  const carousel = useCarouselContext()
  const indicatorProps = $derived({ index, readOnly })
  const mergedProps = $derived(mergeProps(carousel().getIndicatorProps(indicatorProps), props))
</script>

<Ark as="button" {...mergedProps} />
