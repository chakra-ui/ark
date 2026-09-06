import { GridVirtualizer, type GridVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeAccessor } from '../../types.ts'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseGridVirtualizerProps extends GridVirtualizerOptions {}
export type UseGridVirtualizerReturn = GridVirtualizer & { ref: VirtualizerRef }

export function useGridVirtualizer(props: MaybeAccessor<UseGridVirtualizerProps>): UseGridVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new GridVirtualizer(options))
}
