<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { UsePaginationReturn } from './use-pagination.svelte'

  export interface RootProviderProps {
    value: UsePaginationReturn
    children?: Snippet
  }

  export interface PaginationRootProviderBaseProps extends PolymorphicProps<'nav'>, RootProviderProps {}
  export interface PaginationRootProviderProps extends Assign<HTMLProps<'nav'>, PaginationRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PaginationProvider } from './use-pagination-context'

  let { value, ...props }: PaginationRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  PaginationProvider(value)
</script>

<Ark as="nav" {...mergedProps} />
