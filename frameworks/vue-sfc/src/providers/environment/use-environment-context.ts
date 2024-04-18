import type { CommonProperties } from '@zag-js/types'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export type UseEnvironmentContext = ComputedRef<CommonProperties['getRootNode']> | undefined

export const [EnvironmentProvider, useEnvironmentContext] =
  createContext<UseEnvironmentContext>('EnvironmentContext')
