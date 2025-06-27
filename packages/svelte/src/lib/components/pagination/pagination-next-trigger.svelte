<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PaginationNextTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationNextTriggerProps extends Assign<HTMLProps<'button'>, PaginationNextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePaginationContext } from './use-pagination-context'

  let { ref = $bindable(null), ...props }: PaginationNextTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getNextTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
