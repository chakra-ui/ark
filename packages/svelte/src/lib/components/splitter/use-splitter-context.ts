import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { Api } from '@zag-js/splitter'
import type { PropTypes } from '@zag-js/svelte'

export interface UseSplitterContext extends Accessor<Api<PropTypes>> {}

export const [SplitterProvider, useSplitterContext] = createContext<UseSplitterContext>({
  name: 'SplitterContext',
  hookName: 'useSplitterContext',
  providerName: '<SplitterProvider />',
})
