<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/pagination'

  export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationItemProps extends Assign<HTMLProps<'button'>, PaginationItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { usePaginationContext } from './use-pagination-context'

  let { ref = $bindable(null), ...props }: PaginationItemProps = $props()
  const pagination = usePaginationContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'type']))
  const mergedProps = $derived(mergeProps(pagination().getItemProps(itemProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
