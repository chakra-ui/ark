<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PaginationFirstTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationFirstTriggerProps extends Assign<HTMLProps<'button'>, PaginationFirstTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePaginationContext } from './use-pagination-context'

  let { ref = $bindable(null), ...props }: PaginationFirstTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getFirstTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />