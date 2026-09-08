import { GridVirtualizer, type GridVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeFunction } from '@zag-js/utils'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.svelte.ts'

export interface UseGridVirtualizerProps extends GridVirtualizerOptions {}
export type UseGridVirtualizerReturn = GridVirtualizer & { ref: VirtualizerRef }

export function useGridVirtualizer(props: MaybeFunction<UseGridVirtualizerProps>): UseGridVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new GridVirtualizer(options))
}
