<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderControlProps extends HTMLProps<'div'>, SliderControlBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  let { ref = $bindable(), ...props }: SliderControlProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
