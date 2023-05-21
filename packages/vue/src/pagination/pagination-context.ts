import { type connect } from '@zag-js/pagination'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UsePaginationReturn } from './use-pagination'

export const [PaginationProvider, usePaginationContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('PaginationContext')

export type PaginationContext = UnwrapRef<UsePaginationReturn>
