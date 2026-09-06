import type { Accessor } from '$lib/types.js'
import type { GridVirtualizer } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.js'

export interface UseGridVirtualizerContext extends Accessor<GridVirtualizer> {}

export const [GridVirtualizerProvider, useGridVirtualizerContext] = createContext<UseGridVirtualizerContext>({
  name: 'GridVirtualizerContext',
  hookName: 'useGridVirtualizerContext',
  providerName: '<GridVirtualizer.Root />',
})
