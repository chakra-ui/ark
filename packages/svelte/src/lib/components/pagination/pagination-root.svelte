<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UsePaginationProps } from './use-pagination.svelte'

  export interface PaginationRootBaseProps extends UsePaginationProps, PolymorphicProps<'nav'> {}
  export interface PaginationRootProps extends Assign<HTMLProps<'nav'>, PaginationRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PaginationProvider } from './use-pagination-context'
  import { usePagination } from './use-pagination.svelte'

  let { page = $bindable(), pageSize = $bindable(), ...props }: PaginationRootProps = $props()
  const providedId = $props.id()

  const [paginationProps, localProps] = $derived(
    createSplitProps<UsePaginationProps>()(props, [
      'count',
      'defaultPage',
      'defaultPageSize',
      'id',
      'ids',
      'onPageChange',
      'onPageSizeChange',
      'page',
      'pageSize',
      'siblingCount',
      'translations',
      'type',
    ]),
  )

  const resolvedProps = $derived<UsePaginationProps>({
    ...paginationProps,
    id: paginationProps.id ?? providedId,
    page,
    pageSize,
    onPageChange(details) {
      paginationProps.onPageChange?.(details)
      if (page !== undefined) page = details.page
    },
    onPageSizeChange(details) {
      paginationProps.onPageSizeChange?.(details)
      if (pageSize !== undefined) pageSize = details.pageSize
    },
  })

  const pagination = usePagination(() => resolvedProps)
  const mergedProps = $derived(mergeProps(pagination().getRootProps(), localProps))

  PaginationProvider(pagination)
</script>

<Ark as="nav" {...mergedProps} />
