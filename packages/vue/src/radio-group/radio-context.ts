import { type connect, type Context } from '@zag-js/radio-group'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import type { RadioProps } from './radio'

export type RadioContext = Parameters<ReturnType<typeof connect>['getRadioProps']>[0]

export const [RadioProvider, useRadioContext] = createContext<RadioProps>('RadioContext')

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RadioGroupContext')

export type RadioGroupContext = Context
