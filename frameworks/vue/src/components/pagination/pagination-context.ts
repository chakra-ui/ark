import { createContext } from '../../utils'
import type { UsePaginationReturn } from './use-pagination'

export interface PaginationContext extends UsePaginationReturn {}

export const [PaginationProvider, usePaginationContext] =
  createContext<UsePaginationReturn>('PaginationContext')
