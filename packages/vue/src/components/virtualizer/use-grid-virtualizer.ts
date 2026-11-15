import { GridVirtualizer, type GridVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeRefOrGetter } from 'vue'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseGridVirtualizerProps extends GridVirtualizerOptions {}
export type UseGridVirtualizerReturn = GridVirtualizer & { ref: VirtualizerRef }

export function useGridVirtualizer(props: MaybeRefOrGetter<UseGridVirtualizerProps>): UseGridVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new GridVirtualizer(options))
}
