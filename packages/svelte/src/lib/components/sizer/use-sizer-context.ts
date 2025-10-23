import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { UseSizerReturn } from './use-sizer.svelte'

export interface UseSizerContext extends Accessor<UseSizerReturn> {}

export const [SizerProvider, useSizerContext] = createContext<UseSizerContext>({
  name: 'SizerContext',
})
