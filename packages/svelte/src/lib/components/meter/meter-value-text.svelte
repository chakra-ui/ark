<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MeterValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface MeterValueTextProps extends HTMLProps<'span'>, MeterValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMeterContext } from './use-meter-context.ts'

  let { ref = $bindable(null), children, ...rest }: MeterValueTextProps = $props()
  const meter = useMeterContext()
  const mergedProps = $derived(mergeProps(meter().getValueTextProps(), rest))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {meter().valueAsString}
  {/if}
</Ark>
