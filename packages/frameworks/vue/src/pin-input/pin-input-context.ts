import { type connect } from '@zag-js/pin-input'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UsePinInputReturn } from './use-pin-input'

export const [PinInputProvider, usePinInputContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('PinInputContext')

export type PinInputContext = UsePinInputReturn
