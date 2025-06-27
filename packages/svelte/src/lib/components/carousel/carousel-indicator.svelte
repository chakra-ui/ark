<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { IndicatorProps } from '@zag-js/carousel'

  export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface CarouselIndicatorProps extends Assign<HTMLProps<'button'>, CarouselIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { ref = $bindable(), ...props }: CarouselIndicatorProps = $props()
  const [indicatorProps, localProps] = $derived(createSplitProps<IndicatorProps>()(props, ['index', 'readOnly']))

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getIndicatorProps(indicatorProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
