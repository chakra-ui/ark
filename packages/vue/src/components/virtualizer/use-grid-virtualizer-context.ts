import type { GridVirtualizer } from '@zag-js/virtualizer'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export interface UseGridVirtualizerContext extends ComputedRef<GridVirtualizer> {}

export const [GridVirtualizerProvider, useGridVirtualizerContext] =
  createContext<UseGridVirtualizerContext>('GridVirtualizerContext')
