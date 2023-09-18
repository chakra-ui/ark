import { createContext } from '../context'
import { type UsePaginationReturn } from './use-pagination'

export const [PaginationProvider, usePaginationContext] =
  createContext<UsePaginationReturn>('PaginationContext')

export type PaginationContext = UsePaginationReturn
