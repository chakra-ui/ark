<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps<'span'> {}
  export interface SliderDraggingIndicatorProps
    extends HTMLProps<'span'>,
      SliderDraggingIndicatorBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'
  import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

  const props: SliderDraggingIndicatorProps = $props()
  const slider = useSliderContext()
  const { index } = useSliderThumbPropsContext()
  const mergedProps = $derived(mergeProps(slider().getDraggingIndicatorProps({ index }), props))
</script>

<Ark as="span" {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {slider().getThumbValue(index)}
  {/if}
</Ark>
