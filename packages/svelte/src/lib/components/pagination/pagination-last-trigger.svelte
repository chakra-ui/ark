<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { PaginationAnchorProps } from './use-pagination.svelte.ts'

  export interface PaginationLastTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationLastTriggerProps
    extends Assign<HTMLProps<'button'> & PaginationAnchorProps, PaginationLastTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePaginationContext } from './use-pagination-context.ts'

  let { ref = $bindable(null), ...props }: PaginationLastTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getLastTriggerProps(), props))
</script>

{#if pagination().type === 'link'}
  <Ark as="a" bind:ref {...mergedProps} />
{:else}
  <Ark as="button" bind:ref {...mergedProps} />
{/if}
