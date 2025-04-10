<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SliderMarkerGroupBaseProps extends PolymorphicProps<'div'> {}
  export interface SliderMarkerGroupProps extends HTMLProps<'div'>, SliderMarkerGroupBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  const props: SliderMarkerGroupProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getMarkerGroupProps(), props))
</script>

<Ark as="div" {...mergedProps} />
