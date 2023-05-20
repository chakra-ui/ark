import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UseToastItemReturn } from './use-toast-item'

export type ToastItemContext = UseToastItemReturn

export const [ToastItemProvider, useToastItemContext] =
  createContext<ComputedRef<ToastItemContext>>('ToastItemContext')
