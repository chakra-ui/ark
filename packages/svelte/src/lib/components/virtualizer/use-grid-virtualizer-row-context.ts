import type { Accessor } from '$lib/types.js'
import type { VirtualRow } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.js'

export interface UseGridVirtualizerRowContext extends Accessor<VirtualRow> {}

export const [GridVirtualizerRowProvider, useGridVirtualizerRowContext] = createContext<UseGridVirtualizerRowContext>({
  name: 'GridVirtualizerRowContext',
  hookName: 'useGridVirtualizerRowContext',
  providerName: '<GridVirtualizer.Row />',
})
