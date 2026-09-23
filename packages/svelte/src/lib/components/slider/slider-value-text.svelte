<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    children?: Snippet
  }
  export interface SliderValueTextProps extends HTMLProps<'span'>, SliderValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useSliderContext } from './use-slider-context.ts'

  let { ref = $bindable(null), children, ...props }: SliderValueTextProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {slider().value.join(', ')}
  {/if}
</Ark>
