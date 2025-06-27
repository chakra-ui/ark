<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ProgressValueTextProps extends HTMLProps<'span'>, ProgressValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  let { ref = $bindable(), children, ...rest }: ProgressValueTextProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getValueTextProps(), rest))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {progress().percentAsString}
  {/if}
</Ark>
