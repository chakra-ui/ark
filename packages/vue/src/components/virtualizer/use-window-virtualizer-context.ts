import type { WindowVirtualizer } from '@zag-js/virtualizer'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export interface UseWindowVirtualizerContext extends ComputedRef<WindowVirtualizer> {}

export const [WindowVirtualizerProvider, useWindowVirtualizerContext] =
  createContext<UseWindowVirtualizerContext>('WindowVirtualizerContext')
