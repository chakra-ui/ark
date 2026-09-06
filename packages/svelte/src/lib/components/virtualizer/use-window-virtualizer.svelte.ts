import { WindowVirtualizer, type WindowVirtualizerOptions } from '@zag-js/virtualizer'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.svelte.ts'

export interface UseWindowVirtualizerProps extends WindowVirtualizerOptions {}
export type UseWindowVirtualizerReturn = WindowVirtualizer & { ref: VirtualizerRef }

export function useWindowVirtualizer(props: UseWindowVirtualizerProps): UseWindowVirtualizerReturn {
  return useVirtualizerStore(() => new WindowVirtualizer(props))
}
