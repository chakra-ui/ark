import { ListVirtualizer, type ListVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeRef } from 'vue'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseListVirtualizerProps extends ListVirtualizerOptions {}
export type UseListVirtualizerReturn = ListVirtualizer & { ref: VirtualizerRef }

export function useListVirtualizer(props: MaybeRef<UseListVirtualizerProps>): UseListVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new ListVirtualizer(options))
}
