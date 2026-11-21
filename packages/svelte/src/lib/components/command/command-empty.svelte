<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandEmptyBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CommandEmptyProps extends Assign<HTMLProps<'div'>, CommandEmptyBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'

  let { ref = $bindable(null), children, ...props }: CommandEmptyProps = $props()

  const command = useCommandContext()
  const isEmpty = $derived(command().collection.size === 0)
  const mergedProps = $derived(mergeProps(command().getEmptyProps(), parts.empty.attrs(''), props))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#if isEmpty}{@render children?.()}{/if}
</Ark>
