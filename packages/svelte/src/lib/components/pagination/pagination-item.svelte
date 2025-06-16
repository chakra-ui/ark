<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { ItemProps } from '@zag-js/pagination'

  export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps<'button'> {}
  export interface PaginationItemProps extends Assign<HTMLProps<'button'>, PaginationItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePaginationContext } from './use-pagination-context'

  const props: PaginationItemProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getItemProps(props), props))
</script>

<Ark as="button" {...mergedProps} />
