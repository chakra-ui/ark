<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PaginationPrevTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationPrevTriggerProps extends Assign<HTMLProps<'button'>, PaginationPrevTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePaginationContext } from './use-pagination-context'

  let { ref = $bindable(), ...props }: PaginationPrevTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getPrevTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
