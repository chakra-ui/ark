import { ListVirtualizer, type ListVirtualizerOptions } from '@zag-js/virtualizer'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.svelte.ts'

export interface UseListVirtualizerProps extends ListVirtualizerOptions {}
export type UseListVirtualizerReturn = ListVirtualizer & { ref: VirtualizerRef }

export function useListVirtualizer(props: UseListVirtualizerProps): UseListVirtualizerReturn {
  return useVirtualizerStore(() => new ListVirtualizer(props))
}
