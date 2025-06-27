<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderValueTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderValueTextProps extends HTMLProps<'div'>, SliderValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  let { ref = $bindable(), ...props }: SliderValueTextProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getValueTextProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
