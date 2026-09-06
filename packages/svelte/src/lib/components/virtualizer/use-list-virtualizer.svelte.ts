import { ListVirtualizer, type ListVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeFunction } from '@zag-js/utils'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.svelte.ts'

export interface UseListVirtualizerProps extends ListVirtualizerOptions {}
export type UseListVirtualizerReturn = ListVirtualizer & { ref: VirtualizerRef }

export function useListVirtualizer(props: MaybeFunction<UseListVirtualizerProps>): UseListVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new ListVirtualizer(options))
}
