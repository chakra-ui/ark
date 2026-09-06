import { GridVirtualizer, type GridVirtualizerOptions } from '@zag-js/virtualizer'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.svelte.ts'

export interface UseGridVirtualizerProps extends GridVirtualizerOptions {}
export type UseGridVirtualizerReturn = GridVirtualizer & { ref: VirtualizerRef }

export function useGridVirtualizer(props: UseGridVirtualizerProps): UseGridVirtualizerReturn {
  return useVirtualizerStore(() => new GridVirtualizer(props))
}
