import type { VirtualRow } from '@zag-js/virtualizer'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'

export interface UseGridVirtualizerRowContext extends Accessor<VirtualRow> {}

export const [GridVirtualizerRowProvider, useGridVirtualizerRowContext] = createContext<UseGridVirtualizerRowContext>({
  hookName: 'useGridVirtualizerRowContext',
  providerName: '<GridVirtualizer.Row />',
})
