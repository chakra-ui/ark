<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface SliderHiddenInputProps extends HTMLProps<'input'>, SliderHiddenInputBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'
  import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

  let { ref = $bindable(null), ...props }: SliderHiddenInputProps = $props()
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = $derived(mergeProps(slider().getHiddenInputProps(thumbProps), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
