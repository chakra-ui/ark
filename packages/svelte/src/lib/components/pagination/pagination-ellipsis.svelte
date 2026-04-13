<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { EllipsisProps } from '@zag-js/pagination'

  export interface PaginationEllipsisBaseProps extends EllipsisProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface PaginationEllipsisProps extends Assign<HTMLProps<'div'>, PaginationEllipsisBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { usePaginationContext } from './use-pagination-context'

  let { ref = $bindable(null), ...props }: PaginationEllipsisProps = $props()
  const pagination = usePaginationContext()
  const [ellipsisProps, localProps] = $derived(createSplitProps<EllipsisProps>()(props, ['index']))
  const mergedProps = $derived(mergeProps(pagination().getEllipsisProps(ellipsisProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
