import type { VirtualRow } from '@zag-js/virtualizer'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export interface UseGridVirtualizerRowContext extends ComputedRef<VirtualRow> {}

export const [GridVirtualizerRowProvider, useGridVirtualizerRowContext] =
  createContext<UseGridVirtualizerRowContext>('GridVirtualizerRowContext')
