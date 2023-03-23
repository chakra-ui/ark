import { type connect } from '@zag-js/pagination'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UsePaginationReturn } from './use-pagination'

export const [PaginationProvider, usePaginationContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('PaginationContext')

export type PaginationContext = UsePaginationReturn
