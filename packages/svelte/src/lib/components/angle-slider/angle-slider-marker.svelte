<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { MarkerProps, MarkerState } from '@zag-js/angle-slider'

  export interface AngleSliderMarkerState extends MarkerState {}
  export interface AngleSliderMarkerBaseProps
    extends MarkerProps, PolymorphicProps<'span', AngleSliderMarkerState>, RefAttribute {}
  export interface AngleSliderMarkerProps extends HTMLProps<'span'>, AngleSliderMarkerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { useAngleSliderContext } from './use-angle-slider-context.ts'

  let { ref = $bindable(null), ...props }: AngleSliderMarkerProps = $props()
  const [markerProps, localProps] = $derived(createSplitProps<MarkerProps>()(props, ['value']))

  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getMarkerProps(markerProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps} state={angleSlider().getMarkerState(markerProps)} />
