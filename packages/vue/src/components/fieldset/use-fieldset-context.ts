import { createContext } from '../../utils'
import type { UseFieldsetReturn } from './use-fieldset'

export interface UseFieldsetContext extends UseFieldsetReturn {}
export const [FieldsetProvider, useFieldsetContext] =
  createContext<UseFieldsetContext>('FieldsetContext')
