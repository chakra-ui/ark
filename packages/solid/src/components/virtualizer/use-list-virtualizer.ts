import { ListVirtualizer, type ListVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeAccessor } from '../../types.ts'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseListVirtualizerProps extends ListVirtualizerOptions {}
export type UseListVirtualizerReturn = ListVirtualizer & { ref: VirtualizerRef }

export function useListVirtualizer(props: MaybeAccessor<UseListVirtualizerProps>): UseListVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new ListVirtualizer(options))
}
