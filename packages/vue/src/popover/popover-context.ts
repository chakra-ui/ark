import { type connect } from '@zag-js/popover'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UsePopoverReturn } from './use-popover'

export const [PopoverProvider, usePopoverContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('PopoverContext')

export type PopoverContext = UnwrapRef<UsePopoverReturn>
