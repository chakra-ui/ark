import { WindowVirtualizer, type WindowVirtualizerOptions } from '@zag-js/virtualizer'
import type { MaybeAccessor } from '../../types.ts'
import { type VirtualizerRef, useVirtualizerStore } from './use-virtualizer-store.ts'

export interface UseWindowVirtualizerProps extends WindowVirtualizerOptions {}
export type UseWindowVirtualizerReturn = WindowVirtualizer & { ref: VirtualizerRef }

export function useWindowVirtualizer(props: MaybeAccessor<UseWindowVirtualizerProps>): UseWindowVirtualizerReturn {
  return useVirtualizerStore(props, (options) => new WindowVirtualizer(options))
}
