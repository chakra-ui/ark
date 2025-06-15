<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface NumberInputValueTextBaseProps extends PolymorphicProps<'span'> {}
  export interface NumberInputValueTextProps extends Assign<HTMLProps<'span'>, NumberInputValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  let { children, ...props }: NumberInputValueTextProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getValueTextProps(), props))
</script>

<Ark as="span" {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {numberInput().value}
  {/if}
</Ark>
