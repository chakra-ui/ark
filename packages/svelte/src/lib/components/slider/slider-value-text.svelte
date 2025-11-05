<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderValueTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    children?: Snippet
  }
  export interface SliderValueTextProps extends HTMLProps<'div'>, SliderValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  let { ref = $bindable(null), children, ...props }: SliderValueTextProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getValueTextProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {slider().value.join(', ')}
  {/if}
</Ark>
