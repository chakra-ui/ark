import { type connect } from '@zag-js/slider'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseSliderReturn } from './use-slider'

export const [SliderProvider, useSliderContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('SliderContext')

export type SliderContext = UnwrapRef<UseSliderReturn>
