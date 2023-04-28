import { type connect } from '@zag-js/color-picker'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseColorPickerReturn } from './use-color-picker'

export const [ColorPickerProvider, useColorPickerContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('ColorPickerContext')

export type ColorPickerContext = UnwrapRef<UseColorPickerReturn>
