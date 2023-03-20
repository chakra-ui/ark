import { type connect } from '@zag-js/radio-group'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UseRadioGroupReturn } from './use-radio-group'

export type RadioContext = Parameters<ReturnType<typeof connect>['getRadioProps']>[0]

export const [RadioProvider, useRadioContext] = createContext<RadioContext>('RadioContext')

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RadioGroupContext')

export type RadioGroupContext = UseRadioGroupReturn
