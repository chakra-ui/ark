'use client'

import type { VirtualRow } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.ts'

export interface UseGridVirtualizerRowContext extends VirtualRow {}

export const [GridVirtualizerRowProvider, useGridVirtualizerRowContext] = createContext<UseGridVirtualizerRowContext>({
  name: 'GridVirtualizerRowContext',
  hookName: 'useGridVirtualizerRowContext',
  providerName: '<GridVirtualizer.Row />',
})
