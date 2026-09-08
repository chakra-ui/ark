import type { Accessor } from '$lib/types.js'
import type { WindowVirtualizer } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.js'

export interface UseWindowVirtualizerContext extends Accessor<WindowVirtualizer> {}

export const [WindowVirtualizerProvider, useWindowVirtualizerContext] = createContext<UseWindowVirtualizerContext>({
  name: 'WindowVirtualizerContext',
  hookName: 'useWindowVirtualizerContext',
  providerName: '<WindowVirtualizer.Root />',
})
