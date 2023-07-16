import { type connect, type Context } from '@zag-js/radio-group'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RadioGroupContext')

export type RadioGroupContext = Context
