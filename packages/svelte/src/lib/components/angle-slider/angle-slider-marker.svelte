<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { MarkerProps } from '@zag-js/angle-slider'

  export interface AngleSliderMarkerBaseProps extends MarkerProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface AngleSliderMarkerProps extends HTMLProps<'span'>, AngleSliderMarkerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderMarkerProps = $props()
  const [markerProps, localProps] = $derived(createSplitProps<MarkerProps>()(props, ['value']))

  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getMarkerProps(markerProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps} />
