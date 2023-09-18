import { createContext } from '../context'
import { type UseSelectReturn } from './use-select'

export type SelectContext = UseSelectReturn
export const [SelectProvider, useSelectContext] = createContext<SelectContext>('SelectContext')
