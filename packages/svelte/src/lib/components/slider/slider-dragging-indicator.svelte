<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SliderDraggingIndicatorProps extends HTMLProps<'span'>, SliderDraggingIndicatorBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'
  import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

  let { ref = $bindable(null), ...props }: SliderDraggingIndicatorProps = $props()
  const slider = useSliderContext()
  const { index } = useSliderThumbPropsContext()
  const mergedProps = $derived(mergeProps(slider().getDraggingIndicatorProps({ index }), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {slider().getThumbValue(index)}
  {/if}
</Ark>
