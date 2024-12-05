<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import type { MarkerProps } from '@zag-js/slider'

  export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps<'span'> {}
  export interface SliderMarkerProps extends HTMLProps<'span'>, SliderMarkerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  const props: SliderMarkerProps = $props()
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getMarkerProps(markerProps), localProps))
</script>

<Ark as="span" {...mergedProps} />
