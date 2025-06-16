<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PaginationNextTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface PaginationNextTriggerProps extends Assign<HTMLProps<'button'>, PaginationNextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePaginationContext } from './use-pagination-context'

  const props: PaginationNextTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getNextTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
