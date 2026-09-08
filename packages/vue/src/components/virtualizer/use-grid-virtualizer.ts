import { GridVirtualizer, type GridVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeRef } from 'vue'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseGridVirtualizerProps extends GridVirtualizerOptions {}
export type UseGridVirtualizerReturn = GridVirtualizer & { ref: VirtualizerRef }

export function useGridVirtualizer(props: MaybeRef<UseGridVirtualizerProps>): UseGridVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new GridVirtualizer(options))
}
