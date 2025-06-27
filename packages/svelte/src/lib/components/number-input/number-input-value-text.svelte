<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberInputValueTextProps extends Assign<HTMLProps<'span'>, NumberInputValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  let { ref = $bindable(null), children, ...props }: NumberInputValueTextProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {numberInput().value}
  {/if}
</Ark>
