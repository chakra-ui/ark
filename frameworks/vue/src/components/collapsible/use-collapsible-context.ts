import { createContext } from '../../utils'
import type { UseCollapsibleReturn } from './use-collapsible'

export interface UseCollapsibleContext extends UseCollapsibleReturn {}

export const [CollapsibleProvider, useCollapsibleContext] =
  createContext<UseCollapsibleContext>('CollapsibleContext')
