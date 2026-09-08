import type { Accessor } from '$lib/types.js'
import type { ListVirtualizer } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.js'

export interface UseListVirtualizerContext extends Accessor<ListVirtualizer> {}

export const [ListVirtualizerProvider, useListVirtualizerContext] = createContext<UseListVirtualizerContext>({
  name: 'ListVirtualizerContext',
  hookName: 'useListVirtualizerContext',
  providerName: '<ListVirtualizer.Root />',
})
