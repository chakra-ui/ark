import { WindowVirtualizer, type WindowVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeRef } from 'vue'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseWindowVirtualizerProps extends WindowVirtualizerOptions {}
export type UseWindowVirtualizerReturn = WindowVirtualizer & { ref: VirtualizerRef }

export function useWindowVirtualizer(props: MaybeRef<UseWindowVirtualizerProps>): UseWindowVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new WindowVirtualizer(options))
}
