<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { MarkerProps } from '@zag-js/slider'

  export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface SliderMarkerProps extends HTMLProps<'span'>, SliderMarkerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  let { ref = $bindable(null), ...props }: SliderMarkerProps = $props()
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getMarkerProps(markerProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps} />
