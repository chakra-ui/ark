import type { connect } from '@zag-js/slider'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UseSliderReturn } from './use-slider'

export const [SliderProvider, useSliderContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('SliderContext')

export type SliderContext = UseSliderReturn
