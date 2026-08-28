import { createContext } from '../../utils/create-context.ts'
import type { UsePaginationReturn } from './use-pagination.ts'

export interface UsePaginationContext extends UsePaginationReturn {}

export const [PaginationProvider, usePaginationContext] = createContext<UsePaginationContext>('PaginationContext')
