<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderTrackBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderTrackProps extends HTMLProps<'div'>, SliderTrackBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  let { ref = $bindable(null), ...props }: SliderTrackProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getTrackProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
