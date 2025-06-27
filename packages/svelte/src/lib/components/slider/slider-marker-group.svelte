<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderMarkerGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderMarkerGroupProps extends HTMLProps<'div'>, SliderMarkerGroupBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  let { ref = $bindable(), ...props }: SliderMarkerGroupProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getMarkerGroupProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
