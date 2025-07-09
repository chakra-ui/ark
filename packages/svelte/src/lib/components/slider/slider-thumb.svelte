<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ThumbProps } from '@zag-js/slider'

  export interface SliderThumbBaseProps extends ThumbProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderThumbProps extends HTMLProps<'div'>, SliderThumbBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'
  import SliderThumbPropsProvider from './slider-thumb-props-provider.svelte'

  let { ref = $bindable(null), ...props }: SliderThumbProps = $props()
  const [thumbProps, localProps] = $derived(createSplitProps<ThumbProps>()(props, ['index', 'name']))
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getThumbProps(thumbProps), localProps))
</script>

<SliderThumbPropsProvider value={thumbProps}>
  <Ark as="div" bind:ref {...mergedProps} />
</SliderThumbPropsProvider>
