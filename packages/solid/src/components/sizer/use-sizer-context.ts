import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'
import type { UseSizerReturn } from './use-sizer'

export interface UseSizerContext extends Accessor<UseSizerReturn> {}

export const [SizerProvider, useSizerContext] = createContext<UseSizerContext>({
  hookName: 'useSizerContext',
  providerName: '<SizerProvider />',
})
