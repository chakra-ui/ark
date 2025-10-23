import { createContext } from '../../utils/create-context'
import type { UseSizerReturn } from './use-sizer'

export interface UseSizerContext extends UseSizerReturn {}

export const [SizerProvider, useSizerContext] = createContext<UseSizerContext>('SizerContext')
