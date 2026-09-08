import { WindowVirtualizer, type WindowVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeFunction } from '@zag-js/utils'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.svelte.ts'

export interface UseWindowVirtualizerProps extends WindowVirtualizerOptions {}
export type UseWindowVirtualizerReturn = WindowVirtualizer & { ref: VirtualizerRef }

export function useWindowVirtualizer(props: MaybeFunction<UseWindowVirtualizerProps>): UseWindowVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new WindowVirtualizer(options))
}
