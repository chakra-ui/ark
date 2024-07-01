import { createContext } from '../../utils'
import type { UseFieldReturn } from './use-field'

export interface UseFieldContext extends UseFieldReturn {}
export const [FieldProvider, useFieldContext] = createContext<UseFieldContext>('FieldContext')
