import { createContext } from '../../utils/create-context.ts'
import type { UseMeterReturn } from './use-meter.ts'

export interface UseMeterContext extends UseMeterReturn {}

export const [MeterProvider, useMeterContext] = createContext<UseMeterContext>({
  hookName: 'useMeterContext',
  providerName: '<MeterProvider />',
})
